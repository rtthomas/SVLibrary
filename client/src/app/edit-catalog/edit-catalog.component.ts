import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CacheService } from '../cache.service';
import { ServerService } from '../server.service';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Catalog } from '../model/catalog.model';
import { Book } from '../model/book.model'

declare var $: any;

@Component({
  selector: 'app-edit-catalog',
  templateUrl: './edit-catalog.component.html'
})
export class EditCatalogComponent implements OnInit {

  constructor(private cacheService: CacheService, private serverService: ServerService) { }

  public uploader: FileUploader = new FileUploader({});
  catalogs = [];
  bookTags = [];
  selectedCatalog: string;
  selectedBook: string;

  private booksInCatalog = [];
  private languageToPrefix = {};
  private tagToBook = {};

  ngOnInit() {
    // Retrieve catalogs from the cache, and create map of catalog language to catalog prefix  
    this.catalogs = this.cacheService.getCatalogs();
    for (var i in this.catalogs) {
      var c: Catalog = this.catalogs[i];
      this.languageToPrefix[c.language] = c.id;
    }
  }

  uploadImage(side) {
    var url = this.serverService.baseUrl + "book/" + this.tagToBook[this.selectedBook]['id'] + "/image?side=" + side;
    this.uploader.setOptions({ url: url, disableMultipart: true });
    this.uploader.uploadAll();
  }

  downloadPdf() {
    this.serverService.fetchBookPdf(this.tagToBook[this.selectedBook]['id']);
  }

  downloadAllPdf() {
    var catalogId = this.languageToPrefix[this.selectedCatalog.trim()];
    this.serverService.fetchCatalogPdf(catalogId);
  }

  selectCatalog() {
    // Fetch all books in the catalog
    this.booksInCatalog = this.cacheService.getBooks(this.languageToPrefix[this.selectedCatalog]);
    this.bookTags = [];
    this.tagToBook = {};
    // Create array of book tags, and map of tags to books
    for (var b in this.booksInCatalog) {
      var book: Book = this.booksInCatalog[b];
      var tag = book.catalogId + book.number;
      this.bookTags.push(tag);
      this.tagToBook[tag] = book;
    }
    // Sort the book tag array
    this.bookTags.sort();

    this.selectedBook = this.bookTags[0];
    // Enable the button to generate entire catalog pdf
    $('#download-all').removeAttr("disabled");
    // Enable the Remove button
    $('#remove').removeAttr("disabled");
  }

  removeBook() {
    var book: Book = this.tagToBook[this.selectedBook];
    
    const observable: Observable<any> = this.cacheService.delete('books', book);
    observable.subscribe(
      (next: any) => { },
      (error: any) => { },
      () => {
        this.selectCatalog();
      }
    );
  }
}
