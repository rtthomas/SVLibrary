package com.softart.svlibrary.data;

import com.googlecode.objectify.annotation.Entity;

/**
 * Represents a book 
 */
@Entity
public class Book extends EntityBase{
	
	private String		number;
	private String		catalogId;
	private Long		coverArtId;
	private boolean		removed;

	public String getNumber() {
		return number;	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getCatalogId() {
		return catalogId;
	}
	public void setCatalogId(String catalogId) {
		this.catalogId = catalogId;
	}

	public Long getCoverArtId() {
		return coverArtId;
	}
	public void setCoverArtId(Long coverArtId) {
		this.coverArtId = coverArtId;
	}

	public boolean isRemoved() {
		return removed;
	}
	public void setRemoved(boolean removed) {
		this.removed = removed;
	}
	
}
