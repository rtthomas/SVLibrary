package com.softart.svlibrary;

import java.io.InputStream;
import java.util.List;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.softart.svlibrary.data.Loan;
import com.googlecode.objectify.Key;
import com.softart.svlibrary.data.Book;
import com.softart.svlibrary.data.DataAccess;

/**
 * Handles loan requests
 */
@Path("/loan")
public class LoanResource  extends AbstractResource{

	private final static Logger log = Logger.getLogger(LoanResource.class.getName());
	
	/**
     * Registers the loan of a book. 
     * @param is stream containing JSON representation of a Loan object 
     * @return a Response object containing the HTTP response code, normally 201 Created
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(InputStream is){
    	DataAccess da = new DataAccess();
    	Loan loan = extractObject(is, Loan.class);
     	da.ofyPut(loan);
    	Key<Book> bookKey = Key.create(Book.class, loan.getBookId());
    	Book book = da.ofyFind(bookKey);
     	log.info("Loan " + loan.getId());
    	return responseCreated(loan.getId());
    }
    
    /**
     * Registers return of a book
     * @param loanId the loan id
     * @return a Response object containing the HTTP response code, normally 204 No Content
     */
    @DELETE
    @Path("{loanId}/")
    public Response remove(@PathParam("loanId") long loanId){
    	DataAccess da = new DataAccess();    	
    	log.info("Return " + loanId);
    	da.ofyDelete(Loan.class, loanId);
     	return responseNoContent();
    }
    
    /**
     * Gets all loans
     * @return  a Response object containing the HTTP response code and a JSON array of loan resources
     * Normal return code 200 OK
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(){
    	DataAccess da = new DataAccess();
    	List<Loan> list = da.getAll(Loan.class);
    	for (Loan loan: list){
    		log.info("Found Loan " + loan.getId());
    	}
    	return responseOkWithBody(list);
    }
}
