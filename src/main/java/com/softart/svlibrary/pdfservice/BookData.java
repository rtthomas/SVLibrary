package com.softart.svlibrary.pdfservice;

import java.io.Serializable;

import com.google.appengine.api.datastore.Blob;
import com.googlecode.objectify.Key;
import com.softart.svlibrary.data.Book;
import com.softart.svlibrary.data.CoverArt;
import com.softart.svlibrary.data.DataAccess;

/**
 * Wraps the book identifier and cover images for transmission to the PDF service
 */
public class BookData implements Serializable {
	public String	bookTag;
	public byte[]	backCover;
	public byte[]	frontCover;
	
	public BookData(Book book){
    	bookTag = book.getCatalogId().concat(book.getNumber());
    	Long coverArtId = book.getCoverArtId();
    	if (coverArtId != null){
			// Fetch cover art
			Key<CoverArt> key = Key.create(CoverArt.class, coverArtId);
	    	DataAccess da = new DataAccess();    	
			CoverArt coverArt = da.ofyFind(key);
			Blob frontCover_ = coverArt.getFrontCover();
			Blob backCover_ = coverArt.getBackCover();

			frontCover = frontCover_ == null ? null : frontCover_.getBytes();
			backCover = backCover_ == null ? null : backCover_.getBytes();
    	}
	}
}
