package com.softart.svlibrary.data;

import com.googlecode.objectify.annotation.Entity;
import com.google.appengine.api.datastore.Blob;

/**
 * Stores the cover art for a book
 */
@Entity
public class CoverArt extends EntityBase{

	private Blob	frontCover;
	private Blob	backCover;
	
	public Blob getFrontCover() {
		return frontCover;
	}
	public void setFrontCover(Blob frontCover) {
		this.frontCover = frontCover;
	}
	public Blob getBackCover() {
		return backCover;
	}
	public void setBackCover(Blob backCover) {
		this.backCover = backCover;
	}
}
