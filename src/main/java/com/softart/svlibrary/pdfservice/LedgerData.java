package com.softart.svlibrary.pdfservice;

/**
 * Wraps a ledger row for transmission to the PDF service
 */
public class LedgerData {
	public String	name;
	public String	surname;
	public String	location;
	public String	book;
	public String	loanDate;
	public String	dueDate;
	
	public LedgerData(String name, String surname, String location, String book, String loanDate, String dueDate) {
		this.name = name;
		this.surname = surname;
		this.location = location;
		this.book = book;
		this.loanDate = loanDate;
		this.dueDate = dueDate;
	}
}
