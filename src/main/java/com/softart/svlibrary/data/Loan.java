package com.softart.svlibrary.data;

import java.util.Date;

import com.googlecode.objectify.annotation.Entity;

/**
 * Represents the loan of a book
 */
@Entity
public class Loan  extends EntityBase{
	
	private long	borrowerId;
	private long	bookId;
	private Date	date;
	private Date	dueDate;
	
	public long getBorrowerId() {
		return borrowerId;
	}
	public void setBorrowerId(long borrowerId) {
		this.borrowerId = borrowerId;
	}
	public long getBookId() {
		return bookId;
	}
	public void setBookId(long bookId) {
		this.bookId = bookId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

}
