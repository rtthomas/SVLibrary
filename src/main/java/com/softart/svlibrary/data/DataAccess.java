package com.softart.svlibrary.data;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Key;
import static com.googlecode.objectify.ObjectifyService.ofy;

public class DataAccess {
	private static final Logger log = Logger.getLogger(DataAccess.class.getName());
	
	static {
		try {
			ObjectifyService.register(Class.forName("com.softart.svlibrary.data.Catalog"));
			ObjectifyService.register(Class.forName("com.softart.svlibrary.data.Book"));
			ObjectifyService.register(Class.forName("com.softart.svlibrary.data.Borrower"));
			ObjectifyService.register(Class.forName("com.softart.svlibrary.data.Loan"));
			ObjectifyService.register(Class.forName("com.softart.svlibrary.data.CoverArt"));
		}
		catch (ClassNotFoundException e){
			log.warning(e.getMessage());
		}		
	}

	public <T> List<T> getAll(Class<T> clazz){
		List<T> list = ofy().load().type(clazz).list();
		log.log(Level.INFO, "Found " + list.size() + " objects"); 
		return list;
	}
	
	public Key ofyPut(EntityBase o){
		ofy().save().entity(o).now();
		Key key = Key.create(o.getClass(), o.getId());
		log.log(Level.INFO, "+++ Put " + o.getClass().getName() + "\n" + o.toString());
		return key;
	}
	
	public void ofyPut(Catalog o){
		ofy().save().entity(o).now();
		log.log(Level.INFO, "+++ Put " + o.getClass().getName() + "\n" + o.toString());
	}
	
	public <T> void ofyDelete(Class<T> clazz, long id){
		Key<T> key = Key.create(clazz, id);
		ofy().delete().key(key).now();
	}
	
	public <T> T ofyFind(Key<T> key){
		T o = ofy().load().key(key).now();
		if (o == null){
			log.log(Level.SEVERE, "+++ Find\n" + "--- Not found key = " + (key.getName() == null ? key.getId() : key.getName()));
		}
		return o;
	}
}

