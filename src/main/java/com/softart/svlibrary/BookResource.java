package com.softart.svlibrary;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.appengine.api.datastore.Blob;
import com.google.appengine.api.images.Image;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.Transform;
import com.googlecode.objectify.Key;
import com.softart.svlibrary.data.Book;
import com.softart.svlibrary.data.CoverArt;
import com.softart.svlibrary.data.DataAccess;
import com.softart.svlibrary.pdfservice.BookData;
import com.softart.svlibrary.pdfservice.PdfGenerator;

/**
 * Handles book requests
 */
@Path("/book")
public class BookResource extends AbstractResource{
	
	private final static Logger log = Logger.getLogger(BookResource.class.getName());
	static String missingArt = "<html><head></head><body><h2>Error</h2></body></html>";

	/**
     * Creates a catalog entry for a book. 
     * @param is stream containing JSON representation of a Book object 
     * @return a Response object containing the HTTP response code, normally 201 Created
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(InputStream is){
    	DataAccess da = new DataAccess();
    	Book book = extractObject(is, Book.class);
     	da.ofyPut(book);
     	log.info("Put Book " + book.getId());
    	return responseCreated(book.getId());
    }
    
	/**
     * Removes a book from the catalog. 
     * @param bookId the book id
     * @return a Response object containing the HTTP response code, normally 204 No Content
     */
    @DELETE
    @Path("{bookId}")
    public Response remove(@PathParam("bookId") Long bookId){
    	DataAccess da = new DataAccess();    	
    	da.ofyDelete(Book.class, bookId);
    	log.info("Delete Book " + bookId);
    	return responseNoContent();
    }
    
    /**
     * Saves the front or back page image, if necessary reducing the size to maximum 400K, the Data Store Blob size limit 
     * @param imageBuffer the book id
     * @param bookId the book id
     * @param side "front" or "back"
     * @return a Response object containing the HTTP response code, normally 201 Created
     */
    @POST
    @Path("{bookId}/image")
    public Response saveImage(byte[] imageBuffer, @PathParam("bookId") Long bookId, @QueryParam("side") String side){
    	DataAccess da = new DataAccess();
    	
    	// Fetch the book
    	Key<Book> bookKey = Key.create(Book.class, bookId);
    	Book book = da.ofyFind(bookKey);
    	
    	// Fetch or create the CovertArt object
    	CoverArt coverArt = null;
    	Key<CoverArt> coverArtKey = null;
    	
    	Long coverArtId = book.getCoverArtId();
    	if (coverArtId == null){
    		coverArt = new CoverArt();
    	}
    	else {
        	coverArtKey = Key.create(CoverArt.class, coverArtId);
    		coverArt = da.ofyFind(coverArtKey);
    	}
    	while (imageBuffer.length > 400000){
    		imageBuffer = reduceSize(imageBuffer);
    	}
    	// Read the image and create the blob in the CoverArt object
    	try {
    		Blob blob = new Blob(imageBuffer);
    		if (side.equals("front")){
    			coverArt.setFrontCover(blob);
    		}
    		else {
    			coverArt.setBackCover(blob);
    		}
    	}
    	catch (Exception e){
    		return this.responseError();
    	}
    	// Store the CoverArt
    	coverArtKey = da.ofyPut(coverArt);
    	log.info("Saved CoverArt Key = " + coverArtKey.getId());
    	
    	// Save its key in the book
    	book.setCoverArtId(coverArtKey.getId());
    	da.ofyPut(book);
    	return responseCreated();
    }
    
    private byte[] reduceSize(byte[] in){
    	float reductionRatio = 400000.0f / in.length; 
		Image image = ImagesServiceFactory.makeImage(in);
		int newWidth = (int)(image.getWidth() * reductionRatio);
		int newHeight = (int)(image.getHeight() * reductionRatio);
    	
		Transform t = ImagesServiceFactory.makeResize(newWidth, newHeight);
		ImagesService service = ImagesServiceFactory.getImagesService();
    	image = service.applyTransform(t, image);

    	return image.getImageData();
    }

    /**
     * Generates a pdf page for a book
     * @param bookId the book id
	 * @param context servlet context required to obtain pdfserver host string from context initialization parameter 
     * @return a Response object containing the HTTP response code, normally 200 Ok, and the file content
     */
    @GET
    @Path("{bookId}")
    public Response getCatalogPage(@PathParam("bookId") Long bookId, @Context ServletContext context){
    	// Fetch the book
    	DataAccess da = new DataAccess();    	
    	Key<Book> bookKey = Key.create(Book.class, bookId);
    	Book book = da.ofyFind(bookKey);
    	BookData bookData = new BookData(book);
    	
    	List<BookData> allData = new ArrayList<BookData>();
    	allData.add(bookData);
    	PdfGenerator generator = new PdfGenerator();
    	byte[] pdf = generator.createCatalogPdf(allData);
    	
    	ResponseBuilder builder = Response.ok(pdf, MediaType.APPLICATION_OCTET_STREAM);
    	String bookTag = book.getCatalogId().concat(book.getNumber());
    	builder.header("Content-Disposition", "attachment; filename=" + bookTag + ".pdf");
    	return builder.build();
    }
    
    /**
     * Gets all books
     * @return Response object containing JSON representation of all books across all catalogs 
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(){
    	DataAccess da = new DataAccess();
    	List<Book> list = da.getAll(Book.class);
    	return responseOkWithBody(list);
    }
}


