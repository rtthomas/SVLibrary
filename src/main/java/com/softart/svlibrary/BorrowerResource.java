package com.softart.svlibrary;

import java.io.InputStream;
import java.util.List;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.softart.svlibrary.data.DataAccess;
import com.googlecode.objectify.Key;
import com.softart.svlibrary.data.Borrower; 

/**
 * Handles borrower requests
 */
@Path("/borrower")
public class BorrowerResource extends AbstractResource{

	private final static Logger log = Logger.getLogger(BorrowerResource.class.getName());
    /**
     * Creates a new borrower. 
     * @param is input stream to read JSON representation of a Borrower object
     * @return a Response object containing the HTTP response code 
     * Normal return code 201 Created
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(InputStream is){
    	DataAccess da = new DataAccess();
    	Borrower borrower = extractObject(is, Borrower.class);
    	Key<Borrower> key = da.ofyPut(borrower);
    	log.info("Put Borrower" + borrower.getId());
    	return responseCreated(key.getId());
    }

    /**
     * Gets all borrowers
     * @return  a Response object containing the HTTP response code and a JSON array of borrower resources
     * Normal return code 200 OK
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(){
    	DataAccess da = new DataAccess();
    	List<Borrower> list = da.getAll(Borrower.class);
    	return responseOkWithBody(list);
    }
    
}
