package com.softart.svlibrary.pdfservice;

import java.io.ByteArrayOutputStream;
import java.util.Iterator;
import java.util.List;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.color.Color;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.SolidBorder;
import com.itextpdf.layout.element.AreaBreak;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.VerticalAlignment;

public class PdfGenerator {

	public byte[] createLedgerPdf(List<LedgerData> loanList){
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		
		PdfWriter writer = new PdfWriter(os);
		PdfDocument pdf = new PdfDocument(writer);
		Document document = new Document(pdf, PageSize.A4);
        
		Table table = new Table(new float[]{4,5,16,2,2,2});
		table.setWidthPercent(100);
        table.addHeaderCell(new Cell(1, 1).add("Name").setBold());
        table.addHeaderCell(new Cell(1, 1).add("Surname").setBold());
        table.addHeaderCell(new Cell(1, 1).add("Location").setBold());
        table.addHeaderCell(new Cell(1, 1).add("Book").setBold());
        table.addHeaderCell(new Cell(1, 1).add("Loaned").setBold());
        table.addHeaderCell(new Cell(1, 1).add("Due").setBold());
		
		Iterator<LedgerData> i = loanList.iterator();
		while (i.hasNext()){
			LedgerData data = i.next();
			
			table.addCell(new Cell(1, 1).add(data.name));
			table.addCell(new Cell(1, 1).add(data.surname));
			table.addCell(new Cell(1, 1).add(data.location));
			table.addCell(new Cell(1, 1).add(data.book));
			table.addCell(new Cell(1, 1).add(data.loanDate));
			table.addCell(new Cell(1, 1).add(data.dueDate == null ? "" : data.dueDate));
		}
		// Add empty rows for manual entry
		int rowsPerPage = 33;
		int remainder = loanList.size() % rowsPerPage;
		int extra = 2 * rowsPerPage - remainder;
		for (int j = 0; j < extra; j++){
			table.addCell(".").addCell(".").addCell(".").addCell(".").addCell(".").addCell(".");
		}
		document.add(table);
		document.close();
		return os.toByteArray();
	}	
	
	public byte[] createCatalogPdf(List<BookData> allData){

		ByteArrayOutputStream os = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(os);
		PdfDocument pdf = new PdfDocument(writer);
		Document document = new Document(pdf, PageSize.A4.rotate());
		document.setMargins(40,20,20,20);
		
		Iterator<BookData> i = allData.iterator();
		while (i.hasNext()){
			BookData data = i.next();
			addBook(data, document);
			if (i.hasNext()){
				document.add(new AreaBreak());
			}
		}
		document.close();
		return os.toByteArray();
	}

	private void addBook(BookData data, Document document){
		
		Table table = new Table(new float[]{200, 200});
		table.setWidthPercent(90).setHorizontalAlignment(HorizontalAlignment.CENTER);
		
		Paragraph title = new Paragraph(data.bookTag);
		title.setFontSize(20).setBold().setFirstLineIndent(340);

		Cell titleCell = new Cell(1, 2).setHeight(30).setBorder(new SolidBorder(Color.WHITE, 1.0f));
		titleCell.add(title);
		table.addCell(titleCell);
		
		if (data.frontCover == null){
			table.addCell(new Cell(1, 1).add("No Front Cover Image").setPadding(90).setBorder(new SolidBorder(Color.WHITE, 1.0f)));
		}
		else {
			Image front = new Image(ImageDataFactory.create(data.frontCover));
			front.setAutoScale(true);
			Cell cell = new Cell(1, 1).setPadding(10).setBorder(new SolidBorder(Color.WHITE, 1.0f)).setMaxHeight(450);
			cell.add(front);
			table.addCell(cell);
		}
		
		if (data.backCover == null){
			table.addCell(new Cell(1, 1).add("No Back Cover Image").setPadding(90).setBorder(new SolidBorder(Color.WHITE, 1.0f)));
		}
		else {
			Image back = new Image(ImageDataFactory.create(data.backCover));
			back.setAutoScale(true);
			Cell cell = new Cell(1, 1).setPadding(10).setBorder(new SolidBorder(Color.WHITE, 1.0f)).setMaxHeight(450);
			cell.add(back);
			table.addCell(cell);
		}
		document.add(table);		
/*		
		Paragraph title = new Paragraph(data.bookTag);
		title.setFontSize(20);
		title.setBold();
//		title.setVerticalAlignment(VerticalAlignment.TOP);
		title.setFirstLineIndent(380);
//		document.add(title);
		Cell titleCell = new Cell(1, 2);
		titleCell.setHeight(40).setBackgroundColor(Color.YELLOW);
		titleCell.add(title);
		Table table = new Table(new float[]{200, 200});
		table.setWidthPercent(90);
		table.setHorizontalAlignment(HorizontalAlignment.CENTER);
		table.addCell(titleCell);
		
		if (data.frontCover == null){
			table.addCell(new Cell(1, 1).add("No Front Cover Image").setPadding(90).setBorder(new SolidBorder(Color.WHITE, 1.0f)));
		}
		else {
			Image front = new Image(ImageDataFactory.create(data.frontCover));
			front.setAutoScaleWidth(true);
//			front.setMaxHeight(100f);
			table.addCell(new Cell(1, 1).add(front).setPadding(10).setHeight(400).setBorder(new SolidBorder(Color.WHITE, 1.0f)).setBackgroundColor(Color.GRAY));
		}
		
		if (data.backCover == null){
			table.addCell(new Cell(1, 1).add("No Back Cover Image").setPadding(90).setBorder(new SolidBorder(Color.WHITE, 1.0f)));
		}
		else {
			Image back = new Image(ImageDataFactory.create(data.backCover));
			back.setAutoScaleWidth(true);
//			back.setMaxHeight(100f);
			table.addCell(new Cell(1, 1).add(back).setPadding(10).setHeight(400).setBorder(new SolidBorder(Color.WHITE, 1.0f)).setBackgroundColor(Color.GRAY));
		}
		document.add(table);	
		*/	
	}
}
