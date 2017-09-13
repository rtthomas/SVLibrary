package com.softart.svlibrary.data;
import com.googlecode.objectify.annotation.Id;

public class EntityBase {
	@Id
	private Long	id;

	public Long getId(){
		return id;
	}
}
