package com.softart.svlibrary;

import java.io.InputStream;
import java.io.InputStreamReader;


import javax.ws.rs.OPTIONS;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.gson.Gson;
import com.googlecode.objectify.Key;

/**
 * Base class for all resource classes ("*Resource"), providing common methods
 * for response creation and key conversions
 */
public abstract class AbstractResource {

    private Gson gson = new Gson();

    /**
     * Responds to an OPTIONS request. This supports execution of the client during development
     * in its own environment, rather than being deployed with the web application 
     * @return  the Response
     */
    @OPTIONS
    public Response options(){
    	ResponseBuilder builder = Response.status(Response.Status.OK);
    	builder.header("Access-Control-Allow-Origin", "*");
    	builder.header("Access-Control-Allow-Headers", "content-type");
    	builder.header("Access-Control-Allow-Methods", "HEAD,POST,GET,OPTIONS,PUT,DELETE");
    	return builder.build();
    }
    
    /**
     * Extracts a JSON object from the input stream and converts it to the corresponding Java object
     * @param is the input stream
     * @param clazz Java class of the target object
     * @return the object
     */
    protected <T> T extractObject(InputStream is, Class clazz){
    	T object = (T)gson.fromJson(new InputStreamReader(is), clazz);
    	return object;
    }

    /**
     * Generates a normal return (200 Ok) with a body
     * @param body object to be placed in the response body
     * @return  the Response
     */
    protected Response responseOkWithBody(Object body){
    	String responseBody = gson.toJson(body);
    	Response.ResponseBuilder builder = Response.ok(responseBody);
    	builder.header("Access-Control-Allow-Origin", "*");
    	return builder.build();
     }

    /**
     * Creates a 201 Created response with the key as body content
     * @param key the key
     * @return the Response
     */
    protected Response responseCreated(Long key){
    	String id = gson.toJson(key);
    	ResponseBuilder builder = Response.status(Response.Status.CREATED).entity(id);
    	builder.header("Access-Control-Allow-Origin", "*");
    	return builder.build();
    }

    /**
     * Creates a 201 Created response with the key as body content
     * @param key the key
     * @return the Response
     */
    protected Response responseCreated(String key){
    	String id = gson.toJson(key);
    	ResponseBuilder builder = Response.status(Response.Status.CREATED).entity(id);
    	builder.header("Access-Control-Allow-Origin", "*");
    	return builder.build();
    }
    
    /**
     * Creates a 201 Created response with no body 
     * @return the Response
     */
    protected Response responseCreated(){
    	ResponseBuilder builder = Response.status(Response.Status.CREATED);
    	builder.header("Access-Control-Allow-Origin", "*");
    	return builder.build();
    }

    /**
     * Creates a 204 No Content response with no body 
     * @return the Response
     */
    protected Response responseNoContent(){
    	ResponseBuilder builder = Response.status(Response.Status.NO_CONTENT);
    	builder.header("Access-Control-Allow-Origin", "*");
    	return builder.build();
    }
    
    /**
     * Creates a 500 Internal Server Error response with no body 
     * @return the Response
     */
    protected Response responseError(){
    	ResponseBuilder builder = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
    	return builder.build();
    }

    /**
     * Creates a 501 Not Implemented response with no body 
     * @return the Response
     */
    protected Response responseNotImplemented(){
    	ResponseBuilder builder = Response.status(Response.Status.NOT_IMPLEMENTED);
    	return builder.build();
    }

    protected String keyToString(Key key){
    	return key.getString();
    }

    protected Key keyFromString(String s){
    	return Key.create(s);
    }
}
