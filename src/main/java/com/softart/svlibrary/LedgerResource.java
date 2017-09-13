package com.softart.svlibrary;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.TreeMap;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;

import com.softart.svlibrary.data.Borrower;
import com.softart.svlibrary.data.DataAccess;
import com.softart.svlibrary.data.Loan;
import com.softart.svlibrary.data.Book;

import com.googlecode.objectify.Key;
import com.softart.svlibrary.pdfservice.LedgerData;
import com.softart.svlibrary.pdfservice.PdfGenerator;

/**
 * Handles ledger requests
 */
@Path("/ledger")
public class LedgerResource extends AbstractResource{
	
	/**
	 * Retrieves the ledger as a PDF file
	 * @param context servlet context required to obtain pdfserver host string from context initialization parameter 
     * @return a Response object containing the HTTP response code, normally 200 Ok, and the file content
	 */
	@GET
    @Produces("application/pdf")
	public Response getLedger(@Context ServletContext context){
    	
		DataAccess da = new DataAccess();
    	List<Loan> list = da.getAll(Loan.class);
		List<LedgerData> lines = new ArrayList<LedgerData>();
		SimpleDateFormat formatter = new SimpleDateFormat("MMMM d");
    	
		for (Loan loan: list){
 			Key<Borrower> borrowerKey = Key.create(Borrower.class, loan.getBorrowerId());
 			Borrower borrower = da.ofyFind(borrowerKey); 
 			
 			Key<Book> bookKey = Key.create(Book.class, loan.getBookId());
 			Book book = da.ofyFind(bookKey); 
 			String bookTag = book.getCatalogId() + book.getNumber();
 			
 			LedgerData line = new LedgerData(
 					borrower.getName(), 
 					borrower.getSurname(), 
 					borrower.getLocation(), 
 					bookTag, 
 					formatter.format(loan.getDate()), 
 					formatter.format(loan.getDueDate()));
 			lines.add(line);
     	}
		lines = sortByName(lines);
	   	PdfGenerator generator = new PdfGenerator();		
		byte[] pdf = generator.createLedgerPdf(lines);
		
		ResponseBuilder builder = Response.ok(pdf, MediaType.APPLICATION_OCTET_STREAM);
		String filename = "Ledger-" + (new SimpleDateFormat("MMMM-dd-yyyy")).format(new Date()) + ".pdf";
		
		builder.header("Content-Disposition", "attachment; filename=" + filename);
		return builder.build();
	}
	
	private List<LedgerData> sortByName(List<LedgerData> unsorted){
    	TreeMap<String, LedgerData> map = new TreeMap<String, LedgerData>();
    	List<LedgerData> sorted = new ArrayList<LedgerData>();
    	for (LedgerData line: unsorted){
    		map.put(line.name, line);
    	}
    	Iterator<String> keys = map.keySet().iterator();
    	while (keys.hasNext()){
    		String key = keys.next();
    		sorted.add(map.get(key));
    	}
    	return sorted;
	}
}
