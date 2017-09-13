package com.softart.svlibrary;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.TreeMap;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.googlecode.objectify.Key;
import com.softart.svlibrary.data.Book;
import com.softart.svlibrary.data.Catalog;
import com.softart.svlibrary.data.DataAccess;
import com.softart.svlibrary.pdfservice.BookData;
import com.softart.svlibrary.pdfservice.PdfGenerator;

/**
 * Handles catalog requests
 */
@Path("/catalog")
public class CatalogResource extends AbstractResource {

    /**
     * Creates a catalog. 
     * @param is stream containing JSON representation of a Catalog object 
     * @return a Response object containing the HTTP response code 
     * Normal return code 201 Created
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(InputStream is){
    	DataAccess da = new DataAccess();
    	Catalog catalog = extractObject(is, Catalog.class);
    	da.ofyPut(catalog);
    	return responseCreated(catalog.getId());
    }
    
    /**
     * Gets all catalogs
     * @return  a Response object containing the HTTP response code and a JSON array of catalog objects
     * Normal return code 200 OK
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(){
    	DataAccess da = new DataAccess();
    	List<Catalog> list = da.getAll(Catalog.class);
    	return responseOkWithBody(list);
    }
    
    /**
     * Generates a pdf page for an entire catalog
     * @param catalogId the catalog id
	 * @param context servlet context required to obtain pdfserver host string from context initialization parameter 
     * @return Response object containing the pdf document  
     */
    @GET
    @Path("{catalogId}")
    public Response getCatalog(@PathParam("catalogId") String catalogId, @Context ServletContext context){
    	DataAccess da = new DataAccess();
    	Key<Catalog> catalogKey = Key.create(Catalog.class, catalogId);
    	Catalog catalog = da.ofyFind(catalogKey);
    	
    	List<Book> allBooks = da.getAll(Book.class);
    	allBooks = sortByTag(allBooks);
    	
    	ArrayList<BookData> allData = new ArrayList<BookData>();
    	for (Book book: allBooks){
    		if (book.getCatalogId().equals(catalogId)){
    			BookData data = new BookData(book);
    			allData.add(data);
    		}
    	}
    	PdfGenerator generator = new PdfGenerator();
    	byte[] pdf = generator.createCatalogPdf(allData);
    	
    	ResponseBuilder builder = Response.ok(pdf, MediaType.APPLICATION_OCTET_STREAM);
    	builder.header("Content-Disposition", "attachment; filename=" + catalog.getLanguage() + ".pdf");
    	return builder.build();
    }
    
    private List<Book> sortByTag(List<Book> unsorted){
    	TreeMap<String, Book> map = new TreeMap<String, Book>();
    	List<Book> sorted = new ArrayList<Book>();
    	for (Book book: unsorted){
    		map.put(book.getNumber(), book);
    	}
    	Iterator<String> keys = map.keySet().iterator();
    	while (keys.hasNext()){
    		String key = keys.next();
    		sorted.add(map.get(key));
    	}
    	return sorted;
    } 
}
