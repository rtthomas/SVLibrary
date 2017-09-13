package com.softart.svlibrary.data;

import com.googlecode.objectify.annotation.Entity;

@Entity
public class Borrower extends EntityBase {

	private String	name;
	private String 	surname;
	private String	location;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
}
