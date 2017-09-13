import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';
import { ServerService } from '../server.service';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Catalog } from '../model/catalog.model';
import { Book } from '../model/book.model'

declare var $: any;

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html'
})
export class AddBookComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({});
  public bookNumber: string;
  public catalogs = [];
  public selectedCatalog: string;
  public numberError: string = "";

  private languageToPrefix = {};
  private frontImageUploaded = false;
  private backImageUploaded = false;
  private newBook: Book;
  private numbers = [];
  private numberToBook = {};

  constructor(private cacheService: CacheService, private serverService: ServerService) { }

  ngOnInit() {
    // Retrieve catalogs from the cache, and create map of catalog language to catalog prefix  
    this.catalogs = this.cacheService.getCatalogs();
    for (var i in this.catalogs){
      var c:Catalog = this.catalogs[i];
      this.languageToPrefix[c.language] = c.id;
    }
  }

  /** Called when catalog selected */
  selectCatalog(){
    // Create sorted array of book numbers
    var books: Array<Book> = this.cacheService.getBooks(this.languageToPrefix[this.selectedCatalog.trim()]);
    this.numbers = [];
    this.numberToBook = {};
    for (var i in books){
      var book = books[i];
      this.numbers.push(book.number);
      this.numberToBook[book.number] = book;
    }
    this.numbers.sort();
    if (this.numbers.length == 0){
      this.bookNumber = '1';
    }
    else {
      var nextNumber:number = this.numbers[this.numbers.length - 1];
      nextNumber++;
      this.bookNumber = new String(nextNumber).toString();
    }
  }
  
  /** Adds a book to the catalog */
  add(){
    // First check if user tries to enter the same number twice
    if (this.numberToBook[this.bookNumber]){
      this.numberError = "That book has already been added";
      return;
    }
    else {
      this.numberError = "";
    }
    this.newBook = new Book(null, this.bookNumber, this.languageToPrefix[this.selectedCatalog.trim()], null, false);
    this.cacheService.save('books', this.newBook); 
    // Show the image upload area
    $('#image-entry').show();
  }

  /** Uploads a cover image to the server
   * @param side 'front' or 'back'
   */
  uploadImage(side){
    var url = this.serverService.baseUrl + "book/" + this.newBook.id + "/image?side=" + side;
    this.uploader.setOptions({url: url, disableMultipart: true});
    this.uploader.uploadAll();
    if (side == "front"){
      this.frontImageUploaded = true;
    }
    else {
      this.backImageUploaded = true;
    }
    if (this.frontImageUploaded && this.backImageUploaded){
      $('#download').removeAttr("disabled");
    }
  }

  downloadPdf(){
    this.serverService.fetchBookPdf(this.newBook.id);
  }
}
