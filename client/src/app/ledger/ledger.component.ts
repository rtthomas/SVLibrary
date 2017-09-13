import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CacheService } from '../cache.service';
import { ServerService } from '../server.service';
import { UtilitiesService } from './../utilities.service';
import { Borrower } from '../model/borrower.model';
import { Catalog } from '../model/catalog.model';
import { Book } from '../model/book.model'
import { Loan } from '../model/loan.model'
import { differenceInDays } from 'date-fns';
import { format } from 'date-fns';
import { addDays } from 'date-fns';

declare var $: any;

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html'
})
export class LedgerComponent implements OnInit {

  selectedCatalog: string;    // Catalog language selected from picklist
  selectedBook: string;       // Tag of selected book (catalog id + book number)
  selectedBorrower: Borrower;
  newBorrower: Borrower = new Borrower(null, null, null, null);
  borrowerMessage: string = '';
  loanMessage: string;

  private bookTags = [];        // Tags of all books in selected catalog

  resetBorrowerPicklist: boolean = false;

  private catalogs = [];          // All Catalog objects
  private bookTagMap = {};        // Maps book tag to Book
  private languageToPrefix = {};  // Catalog language to prefix
  private borrowerToLoanMap = {}; // Borrower id to loan
  private bookToLoanMap = {};     // Book id to loan
  private currentLoan: Loan;
  private activeBorrowerArea: string;

  constructor(
    private cacheService: CacheService,
    private utilitiesService: UtilitiesService,
    private serverService: ServerService) { }

  ngOnInit() {
    if (this.utilitiesService.isMobileDevice()) {
      // On mobile device, this will be the only component
      const observable: Observable<any> = this.cacheService.initialize();
      observable.subscribe(
        (next: any) => { },
        (error: any) => {console.log('Error iniializing cache');  },
        () => {
          this.initialize();
        }
      );
    }
    else {
      this.initialize();
    }
  }

  private initialize() {
    // Retrieve catalogs from the cache, and create map of catalog language to catalog prefix  
    this.catalogs = this.cacheService.getCatalogs();
    for (var i in this.catalogs) {
      var c: Catalog = this.catalogs[i];
      this.languageToPrefix[c.language] = c.id;
    }
    // Retrieve the loans and create loan map
    var loans = this.cacheService.getLoans();
    for (var j = 0; j < loans.length; j++) {
      var loan: Loan = loans[j];
      this.borrowerToLoanMap[loan.borrowerId] = loan;
      this.bookToLoanMap[loan.bookId] = loan;
    }
    // Display the Download Ledger button only if not on mobile
    if (!this.utilitiesService.isMobileDevice()) {
      $('#download-ledger').show();
    }
  }

  toggleNewBorrowerArea() {
    this.clearAllFields();
    this.collapse('borrow-return');
    this.collapse('update-borrower');
  }

  toggleUpdateBorrowerArea() {
    this.clearAllFields();
    this.collapse('borrow-return');
    this.collapse('new-borrower')
    this.activeBorrowerArea = 'update-borrower';
  }

  toggleBorrowReturnArea() {
    this.clearAllFields();
    $('#borrower-status').attr('style', "display:none!important");
    $('#select-book').attr('style', "display:none!important");
    this.collapse('new-borrower');
    this.collapse('update-borrower')
    this.activeBorrowerArea = 'borrow-return';
  }

  private clearAllFields() {
    this.resetBorrowerPicklist = !this.resetBorrowerPicklist;
    this.selectedCatalog = null;
    this.newBorrower = new Borrower(null, null, null, null);
    this.selectedBook = null;
    this.selectedBorrower = null;
    this.loanMessage = '';
    $('#borrow').attr("disabled", "true");
  }

  addBorrower() {
    var n = this.newBorrower.name;
    var s = this.newBorrower.surname;
    var l = this.newBorrower.location;
    if (n == null || n.length == 0 || s == null || s.length == 0 || l == null || l.length == 0) {
      this.borrowerMessage = "You must enter name, surname and location";
      return;
    }
    // Capitalize the fields
    this.newBorrower.name = n.substr(0, 1).toUpperCase() + n.substring(1).toLowerCase();
    this.newBorrower.surname = s.substr(0, 1).toUpperCase() + s.substring(1).toLowerCase();
    this.newBorrower.location = l.substr(0, 1).toUpperCase() + l.substring(1);
    this.cacheService.save('borrowers', this.newBorrower);
    this.borrowerMessage = this.newBorrower.name.concat(' ').concat(this.newBorrower.surname).concat(' has been registered');

    this.newBorrower = new Borrower(null, null, null, null);
  }

  /** Called when borrower selection started in borrower-picklist component */
  onBorrowerSelectionStarted(ignored) {
    this.borrowerMessage = '';
    this.loanMessage = '';
    this.selectedCatalog = null;
    this.selectedBook = null;
    $('#borrower-status').attr('style', "display:none!important");
    $('#select-book').attr('style', "display:none!important");
  }

  /** Called when borrower selected in the borrower-picklist component */
  onBorrowerSelected(borrower: Borrower) {
    this.loanMessage = '';
    this.selectedBorrower = borrower;

    if (this.activeBorrowerArea == 'borrow-return') {
      this.currentLoan = this.borrowerToLoanMap[borrower.id];

      if (this.currentLoan != null) {
        // Borrower has a book out on loan
        var book: Book = this.cacheService.getBook(this.currentLoan.bookId);
        // Determine if it is overdue

        var dueDate: string = format(this.currentLoan.dueDate, 'MMMM D');
        var daysOnLoan = differenceInDays(new Date(), this.currentLoan.date);

        var m = "Book " + book.catalogId.concat(book.number);
        if (daysOnLoan < 14) {
          this.loanMessage = m + " is due back on " + dueDate;
        }
        else if (daysOnLoan == 14) {
          this.loanMessage = m + " is due back today"
        }
        else {
          this.loanMessage = m + " was due back on " + dueDate;
        }
        $('#borrower-status').show();
      }
      else {
        // Display the book selector
        $('#select-book').show();
      }
    }
    else { //activeBorrowerArea == 'update-borrower'
      // TODO Implement borrower update 
    }
  }

  selectCatalog() {
    // Fetch all books in the catalog
    var booksInCatalog = this.cacheService.getBooks(this.languageToPrefix[this.selectedCatalog]);
    this.bookTags = [];
    for (var b in booksInCatalog) {
      var book: Book = booksInCatalog[b];
      var tag = book.catalogId.concat(book.number);
      this.bookTags.push(tag);
      this.bookTagMap[tag] = book;
    }
    this.bookTags.sort();
    this.selectedBook = this.bookTags[0];
    // Enable the Borrow button
    $('#borrow').removeAttr("disabled");
  }

  selectBook() {
    this.loanMessage = '';
  }

  borrowBook() {
    var book: Book = this.bookTagMap[this.selectedBook];
    var loan: Loan = this.bookToLoanMap[book.id];
    if (loan) {
      // Book is out on loan
      this.loanMessage = book.catalogId.concat(book.number).concat(' is already loaned out.');
      return;
    }
    $('#select-book').attr('style', "display:none!important");
    this.resetBorrowerPicklist = !this.resetBorrowerPicklist;

    var today = new Date();
    var dueDate = addDays(today, 14);
    loan = new Loan(null, this.selectedBorrower.id, book.id, today, dueDate);
    this.cacheService.save("loans", loan);
    this.borrowerToLoanMap[loan.borrowerId] = loan;
    this.bookToLoanMap[loan.bookId] = loan;

    this.loanMessage = 'Book ' + this.selectedBook.concat(' is due back on ').concat(format(dueDate, 'MMMM D'));
  }

  returnBook() {
    const observable: Observable<any> = this.cacheService.delete('loans', this.currentLoan);
    observable.subscribe(
      (next: any) => { },
      (error: any) => {console.log('Error deleting loan'); },
      () => {
        console.log('Deleted loan');
        delete this.borrowerToLoanMap[this.currentLoan.borrowerId];
        delete this.bookToLoanMap[this.currentLoan.bookId];
        $('#borrower-status').attr('style', "display:none!important");
      }
    );
  }

  downloadLedger() {
    this.collapse('borrow-return');
    this.collapse('new-borrower');
    this.serverService.fetchLedgerPdf();
  }

  private collapse(elementId: string) {
    $('#' + elementId).removeClass('in');
  }
}
