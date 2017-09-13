package com.softart.svlibrary.data;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

/**
 * A catalog is defined by a language and prefix. The prefix
 * attribute is named "id" to conform to the pattern expected by the client
 */
@Entity
public class Catalog {
	@Id
	private String	id;
	private String	language;
	
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
}
