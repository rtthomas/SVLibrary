webpackJsonp([1,4],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_book_model__ = __webpack_require__(111);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddBookComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddBookComponent = (function () {
    function AddBookComponent(cacheService, serverService) {
        this.cacheService = cacheService;
        this.serverService = serverService;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({});
        this.catalogs = [];
        this.numberError = "";
        this.languageToPrefix = {};
        this.frontImageUploaded = false;
        this.backImageUploaded = false;
        this.numbers = [];
        this.numberToBook = {};
    }
    AddBookComponent.prototype.ngOnInit = function () {
        // Retrieve catalogs from the cache, and create map of catalog language to catalog prefix  
        this.catalogs = this.cacheService.getCatalogs();
        for (var i in this.catalogs) {
            var c = this.catalogs[i];
            this.languageToPrefix[c.language] = c.id;
        }
    };
    /** Called when catalog selected */
    AddBookComponent.prototype.selectCatalog = function () {
        // Create sorted array of book numbers
        var books = this.cacheService.getBooks(this.languageToPrefix[this.selectedCatalog.trim()]);
        this.numbers = [];
        this.numberToBook = {};
        for (var i in books) {
            var book = books[i];
            this.numbers.push(book.number);
            this.numberToBook[book.number] = book;
        }
        this.numbers.sort();
        if (this.numbers.length == 0) {
            this.bookNumber = '1';
        }
        else {
            var nextNumber = this.numbers[this.numbers.length - 1];
            nextNumber++;
            this.bookNumber = new String(nextNumber).toString();
        }
    };
    /** Adds a book to the catalog */
    AddBookComponent.prototype.add = function () {
        // First check if user tries to enter the same number twice
        if (this.numberToBook[this.bookNumber]) {
            this.numberError = "That book has already been added";
            return;
        }
        else {
            this.numberError = "";
        }
        this.newBook = new __WEBPACK_IMPORTED_MODULE_4__model_book_model__["a" /* Book */](null, this.bookNumber, this.languageToPrefix[this.selectedCatalog.trim()], null, false);
        this.cacheService.save('books', this.newBook);
        // Show the image upload area
        $('#image-entry').show();
    };
    /** Uploads a cover image to the server
     * @param side 'front' or 'back'
     */
    AddBookComponent.prototype.uploadImage = function (side) {
        var url = this.serverService.baseUrl + "book/" + this.newBook.id + "/image?side=" + side;
        this.uploader.setOptions({ url: url, disableMultipart: true });
        this.uploader.uploadAll();
        if (side == "front") {
            this.frontImageUploaded = true;
        }
        else {
            this.backImageUploaded = true;
        }
        if (this.frontImageUploaded && this.backImageUploaded) {
            $('#download').removeAttr("disabled");
        }
    };
    AddBookComponent.prototype.downloadPdf = function () {
        this.serverService.fetchBookPdf(this.newBook.id);
    };
    return AddBookComponent;
}());
AddBookComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-book',
        template: __webpack_require__(471)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */]) === "function" && _b || Object])
], AddBookComponent);

var _a, _b;
//# sourceMappingURL=add-book.component.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditCatalogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditCatalogComponent = (function () {
    function EditCatalogComponent(cacheService, serverService) {
        this.cacheService = cacheService;
        this.serverService = serverService;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({});
        this.catalogs = [];
        this.bookTags = [];
        this.booksInCatalog = [];
        this.languageToPrefix = {};
        this.tagToBook = {};
    }
    EditCatalogComponent.prototype.ngOnInit = function () {
        // Retrieve catalogs from the cache, and create map of catalog language to catalog prefix  
        this.catalogs = this.cacheService.getCatalogs();
        for (var i in this.catalogs) {
            var c = this.catalogs[i];
            this.languageToPrefix[c.language] = c.id;
        }
    };
    EditCatalogComponent.prototype.uploadImage = function (side) {
        var url = this.serverService.baseUrl + "book/" + this.tagToBook[this.selectedBook]['id'] + "/image?side=" + side;
        this.uploader.setOptions({ url: url, disableMultipart: true });
        this.uploader.uploadAll();
    };
    EditCatalogComponent.prototype.downloadPdf = function () {
        this.serverService.fetchBookPdf(this.tagToBook[this.selectedBook]['id']);
    };
    EditCatalogComponent.prototype.downloadAllPdf = function () {
        var catalogId = this.languageToPrefix[this.selectedCatalog.trim()];
        this.serverService.fetchCatalogPdf(catalogId);
    };
    EditCatalogComponent.prototype.selectCatalog = function () {
        // Fetch all books in the catalog
        this.booksInCatalog = this.cacheService.getBooks(this.languageToPrefix[this.selectedCatalog]);
        this.bookTags = [];
        this.tagToBook = {};
        // Create array of book tags, and map of tags to books
        for (var b in this.booksInCatalog) {
            var book = this.booksInCatalog[b];
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
    };
    EditCatalogComponent.prototype.removeBook = function () {
        var _this = this;
        var book = this.tagToBook[this.selectedBook];
        var observable = this.cacheService.delete('books', book);
        observable.subscribe(function (next) { }, function (error) { }, function () {
            _this.selectCatalog();
        });
    };
    return EditCatalogComponent;
}());
EditCatalogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit-catalog',
        template: __webpack_require__(473)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */]) === "function" && _b || Object])
], EditCatalogComponent);

var _a, _b;
//# sourceMappingURL=edit-catalog.component.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_borrower_model__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_loan_model__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_date_fns__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_date_fns___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_date_fns__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LedgerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LedgerComponent = (function () {
    function LedgerComponent(cacheService, utilitiesService, serverService) {
        this.cacheService = cacheService;
        this.utilitiesService = utilitiesService;
        this.serverService = serverService;
        this.newBorrower = new __WEBPACK_IMPORTED_MODULE_4__model_borrower_model__["a" /* Borrower */](null, null, null, null);
        this.borrowerMessage = '';
        this.bookTags = []; // Tags of all books in selected catalog
        this.resetBorrowerPicklist = false;
        this.catalogs = []; // All Catalog objects
        this.bookTagMap = {}; // Maps book tag to Book
        this.languageToPrefix = {}; // Catalog language to prefix
        this.borrowerToLoanMap = {}; // Borrower id to loan
        this.bookToLoanMap = {}; // Book id to loan
    }
    LedgerComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.utilitiesService.isMobileDevice()) {
            // On mobile device, this will be the only component
            var observable = this.cacheService.initialize();
            observable.subscribe(function (next) { }, function (error) { console.log('Error iniializing cache'); }, function () {
                _this.initialize();
            });
        }
        else {
            this.initialize();
        }
    };
    LedgerComponent.prototype.initialize = function () {
        // Retrieve catalogs from the cache, and create map of catalog language to catalog prefix  
        this.catalogs = this.cacheService.getCatalogs();
        for (var i in this.catalogs) {
            var c = this.catalogs[i];
            this.languageToPrefix[c.language] = c.id;
        }
        // Retrieve the loans and create loan map
        var loans = this.cacheService.getLoans();
        for (var j = 0; j < loans.length; j++) {
            var loan = loans[j];
            this.borrowerToLoanMap[loan.borrowerId] = loan;
            this.bookToLoanMap[loan.bookId] = loan;
        }
        // Display the Download Ledger button only if not on mobile
        if (!this.utilitiesService.isMobileDevice()) {
            $('#download-ledger').show();
        }
    };
    LedgerComponent.prototype.toggleNewBorrowerArea = function () {
        this.clearAllFields();
        this.collapse('borrow-return');
        this.collapse('update-borrower');
    };
    LedgerComponent.prototype.toggleUpdateBorrowerArea = function () {
        this.clearAllFields();
        this.collapse('borrow-return');
        this.collapse('new-borrower');
        this.activeBorrowerArea = 'update-borrower';
    };
    LedgerComponent.prototype.toggleBorrowReturnArea = function () {
        this.clearAllFields();
        $('#borrower-status').attr('style', "display:none!important");
        $('#select-book').attr('style', "display:none!important");
        this.collapse('new-borrower');
        this.collapse('update-borrower');
        this.activeBorrowerArea = 'borrow-return';
    };
    LedgerComponent.prototype.clearAllFields = function () {
        this.resetBorrowerPicklist = !this.resetBorrowerPicklist;
        this.selectedCatalog = null;
        this.newBorrower = new __WEBPACK_IMPORTED_MODULE_4__model_borrower_model__["a" /* Borrower */](null, null, null, null);
        this.selectedBook = null;
        this.selectedBorrower = null;
        this.loanMessage = '';
        $('#borrow').attr("disabled", "true");
    };
    LedgerComponent.prototype.addBorrower = function () {
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
        this.newBorrower = new __WEBPACK_IMPORTED_MODULE_4__model_borrower_model__["a" /* Borrower */](null, null, null, null);
    };
    /** Called when borrower selection started in borrower-picklist component */
    LedgerComponent.prototype.onBorrowerSelectionStarted = function (ignored) {
        this.borrowerMessage = '';
        this.loanMessage = '';
        this.selectedCatalog = null;
        this.selectedBook = null;
        $('#borrower-status').attr('style', "display:none!important");
        $('#select-book').attr('style', "display:none!important");
    };
    /** Called when borrower selected in the borrower-picklist component */
    LedgerComponent.prototype.onBorrowerSelected = function (borrower) {
        this.loanMessage = '';
        this.selectedBorrower = borrower;
        if (this.activeBorrowerArea == 'borrow-return') {
            this.currentLoan = this.borrowerToLoanMap[borrower.id];
            if (this.currentLoan != null) {
                // Borrower has a book out on loan
                var book = this.cacheService.getBook(this.currentLoan.bookId);
                // Determine if it is overdue
                var dueDate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_date_fns__["format"])(this.currentLoan.dueDate, 'MMMM D');
                var daysOnLoan = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_date_fns__["differenceInDays"])(new Date(), this.currentLoan.date);
                var m = "Book " + book.catalogId.concat(book.number);
                if (daysOnLoan < 14) {
                    this.loanMessage = m + " is due back on " + dueDate;
                }
                else if (daysOnLoan == 14) {
                    this.loanMessage = m + " is due back today";
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
        else {
            // TODO Implement borrower update 
        }
    };
    LedgerComponent.prototype.selectCatalog = function () {
        // Fetch all books in the catalog
        var booksInCatalog = this.cacheService.getBooks(this.languageToPrefix[this.selectedCatalog]);
        this.bookTags = [];
        for (var b in booksInCatalog) {
            var book = booksInCatalog[b];
            var tag = book.catalogId.concat(book.number);
            this.bookTags.push(tag);
            this.bookTagMap[tag] = book;
        }
        this.bookTags.sort();
        this.selectedBook = this.bookTags[0];
        // Enable the Borrow button
        $('#borrow').removeAttr("disabled");
    };
    LedgerComponent.prototype.selectBook = function () {
        this.loanMessage = '';
    };
    LedgerComponent.prototype.borrowBook = function () {
        var book = this.bookTagMap[this.selectedBook];
        var loan = this.bookToLoanMap[book.id];
        if (loan) {
            // Book is out on loan
            this.loanMessage = book.catalogId.concat(book.number).concat(' is already loaned out.');
            return;
        }
        $('#select-book').attr('style', "display:none!important");
        this.resetBorrowerPicklist = !this.resetBorrowerPicklist;
        var today = new Date();
        var dueDate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_date_fns__["addDays"])(today, 14);
        loan = new __WEBPACK_IMPORTED_MODULE_5__model_loan_model__["a" /* Loan */](null, this.selectedBorrower.id, book.id, today, dueDate);
        this.cacheService.save("loans", loan);
        this.borrowerToLoanMap[loan.borrowerId] = loan;
        this.bookToLoanMap[loan.bookId] = loan;
        this.loanMessage = 'Book ' + this.selectedBook.concat(' is due back on ').concat(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_date_fns__["format"])(dueDate, 'MMMM D'));
    };
    LedgerComponent.prototype.returnBook = function () {
        var _this = this;
        var observable = this.cacheService.delete('loans', this.currentLoan);
        observable.subscribe(function (next) { }, function (error) { console.log('Error deleting loan'); }, function () {
            console.log('Deleted loan');
            delete _this.borrowerToLoanMap[_this.currentLoan.borrowerId];
            delete _this.bookToLoanMap[_this.currentLoan.bookId];
            $('#borrower-status').attr('style', "display:none!important");
        });
    };
    LedgerComponent.prototype.downloadLedger = function () {
        this.collapse('borrow-return');
        this.collapse('new-borrower');
        this.serverService.fetchLedgerPdf();
    };
    LedgerComponent.prototype.collapse = function (elementId) {
        $('#' + elementId).removeClass('in');
    };
    return LedgerComponent;
}());
LedgerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-ledger',
        template: __webpack_require__(475)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__utilities_service__["a" /* UtilitiesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__utilities_service__["a" /* UtilitiesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */]) === "function" && _c || Object])
], LedgerComponent);

var _a, _b, _c;
//# sourceMappingURL=ledger.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Book; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Book = Book_1 = (function () {
    function Book(id, number, catalogId, coverArtId, removed) {
        this.id = id;
        this.number = number;
        this.catalogId = catalogId;
        this.coverArtId = coverArtId;
        this.removed = removed;
        this.cacheService = __WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */].injector.get(__WEBPACK_IMPORTED_MODULE_0__cache_service__["a" /* CacheService */]);
    }
    Book.fromJson = function (json) {
        return new Book_1(json.id, json.number, json.catalogId, json.coverArtId, json.removed);
    };
    return Book;
}());
Book = Book_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [Number, String, String, Number, Boolean])
], Book);

var Book_1;
//# sourceMappingURL=book.model.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Borrower; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Borrower = Borrower_1 = (function () {
    function Borrower(id, name, surname, location) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.location = location;
        this.cacheService = __WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */].injector.get(__WEBPACK_IMPORTED_MODULE_0__cache_service__["a" /* CacheService */]);
    }
    Borrower.fromJson = function (json) {
        return new Borrower_1(json.id, json.name, json.surname, json.location);
    };
    return Borrower;
}());
Borrower = Borrower_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [Number, String, String, String])
], Borrower);

var Borrower_1;
//# sourceMappingURL=borrower.model.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Catalog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Catalog = Catalog_1 = (function () {
    // The id value is the catalog prefix. This supports common handling of objects
    // in the cache service
    function Catalog(id, language) {
        this.id = id;
        this.language = language;
        this.cacheService = __WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */].injector.get(__WEBPACK_IMPORTED_MODULE_0__cache_service__["a" /* CacheService */]);
    }
    Catalog.fromJson = function (json) {
        return new Catalog_1(json.id, json.language);
    };
    return Catalog;
}());
Catalog = Catalog_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [String, String])
], Catalog);

var Catalog_1;
//# sourceMappingURL=catalog.model.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(42);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Loan; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Loan = Loan_1 = (function () {
    function Loan(id, borrowerId, bookId, date, dueDate) {
        this.id = id;
        this.borrowerId = borrowerId;
        this.bookId = bookId;
        this.date = date;
        this.dueDate = dueDate;
        this.cacheService = __WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */].injector.get(__WEBPACK_IMPORTED_MODULE_0__cache_service__["a" /* CacheService */]);
    }
    Loan.fromJson = function (json) {
        return new Loan_1(json.id, json.borrowerId, json.bookId, new Date(json.date), new Date(json.date));
    };
    return Loan;
}());
Loan = Loan_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [Number, Number, Number, Object, Object])
], Loan);

var Loan_1;
//# sourceMappingURL=loan.model.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_catalog_model__ = __webpack_require__(113);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewCatalogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewCatalogComponent = (function () {
    function NewCatalogComponent(cacheService) {
        this.cacheService = cacheService;
        this.catalogPrefix = "";
        this.catalogLanguage = "";
        this.message = '';
    }
    NewCatalogComponent.prototype.ngOnInit = function () {
        this.cache = this.cacheService.getCatalogs();
    };
    NewCatalogComponent.prototype.createCatalog = function () {
        this.catalogPrefix = this.catalogPrefix.toUpperCase();
        this.catalogLanguage = this.catalogLanguage.substr(0, 1).toUpperCase() + this.catalogLanguage.substring(1).toLowerCase();
        for (var i in this.cache) {
            var catalog = this.cache[i];
            if (catalog.id == this.catalogPrefix) {
                this.message = "There is already a " + catalog.language + " catalog with prefix " + this.catalogPrefix;
                return;
            }
        }
        var catalog = new __WEBPACK_IMPORTED_MODULE_2__model_catalog_model__["a" /* Catalog */](this.catalogPrefix, this.catalogLanguage);
        this.cacheService.save("catalogs", catalog);
        this.message = "Created catalog for " + this.catalogLanguage + " books";
        this.catalogPrefix = "";
        this.catalogLanguage = "";
    };
    return NewCatalogComponent;
}());
NewCatalogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-new-catalog',
        template: __webpack_require__(476)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */]) === "function" && _a || Object])
], NewCatalogComponent);

var _a;
//# sourceMappingURL=new-catalog.component.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__server_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_catalog_model__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_book_model__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_borrower_model__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_loan_model__ = __webpack_require__(114);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CacheService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CacheService = (function () {
    function CacheService(server) {
        this.server = server;
        this.entityMap = {
            catalogs: {
                entityName: 'catalog',
                cache: []
            },
            borrowers: {
                entityName: 'borrower',
                cache: []
            },
            books: {
                entityName: 'book',
                cache: []
            },
            loans: {
                entityName: 'loan',
                cache: []
            }
        };
        this.idToEntity = {};
    }
    CacheService.prototype.initialize = function () {
        var _this = this;
        var observable = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.server.getAll('catalog').subscribe(function (response) {
                _this.entityMap['catalogs'].cache = response.json();
                _this.convertToClasses(_this.entityMap['catalogs'].cache, 'catalog');
                $("#initialize-progress progress").attr("value", 1);
                _this.server.getAll('borrower').subscribe(function (response) {
                    _this.entityMap['borrowers'].cache = response.json();
                    _this.convertToClasses(_this.entityMap['borrowers'].cache, 'borrower');
                    $("#initialize-progress progress").attr("value", 2);
                    _this.server.getAll('book').subscribe(function (response) {
                        _this.entityMap['books'].cache = response.json();
                        _this.convertToClasses(_this.entityMap['books'].cache, 'book');
                        $("#initialize-progress").attr("value", 3);
                        _this.server.getAll('loan').subscribe(function (response) {
                            _this.entityMap['loans'].cache = response.json();
                            _this.convertToClasses(_this.entityMap['loans'].cache, 'loan');
                            $("#initialize-progress").hide();
                            _this.addToLinkMap(_this.entityMap['catalogs'].cache);
                            _this.addToLinkMap(_this.entityMap['borrowers'].cache);
                            _this.addToLinkMap(_this.entityMap['books'].cache);
                            _this.addToLinkMap(_this.entityMap['loans'].cache);
                            for (var key in _this.idToEntity) {
                                var entity = _this.idToEntity[key];
                                //                       this.resolveReferences(entity);
                            }
                            observer.complete();
                        });
                    });
                });
            });
        });
        return observable;
    };
    CacheService.prototype.getCatalogs = function () {
        return this.entityMap.catalogs.cache;
    };
    /** Returns array of borrowers sorted by name+surname */
    CacheService.prototype.getBorrowers = function () {
        var names = [];
        var map = {};
        for (var i in this.entityMap.borrowers.cache) {
            var borrower = this.entityMap.borrowers.cache[i];
            var name = borrower.name + borrower.surname;
            names.push(name);
            map[name] = borrower;
        }
        names.sort();
        var borrowers = [];
        for (var i in names) {
            borrowers.push(map[names[i]]);
        }
        return borrowers;
    };
    /** Returns array of all books in a given catalog */
    CacheService.prototype.getBooks = function (catalogId) {
        var books = [];
        for (var b in this.entityMap.books.cache) {
            var book = this.entityMap.books.cache[b];
            if (book.catalogId == catalogId) {
                books.push(book);
            }
        }
        return books;
    };
    CacheService.prototype.getLoans = function () {
        return this.entityMap.loans.cache;
    };
    CacheService.prototype.getBook = function (bookId) {
        return this.idToEntity[bookId];
    };
    /*
    removeBook(catalogId: string, bookNumber: string) {
      var bookNumber = bookId.substr(catalogId)
      var catalogId = this.languageToPrefix[this.selectedCatalog.trim()];
      var bookNumber = this.selectedBook.substr(catalogId.length);
      var url = this.serverService.baseUrl + "book/" + catalogId + "/" + bookId;
    }
  */
    /** Converts JSON representation of an entity into an object of the entity'e class */
    CacheService.prototype.convertToClasses = function (cache, type) {
        for (var i in cache) {
            var elem = cache[i];
            switch (type) {
                case 'catalog':
                    cache[i] = __WEBPACK_IMPORTED_MODULE_3__model_catalog_model__["a" /* Catalog */].fromJson(elem);
                    break;
                case 'borrower':
                    cache[i] = __WEBPACK_IMPORTED_MODULE_5__model_borrower_model__["a" /* Borrower */].fromJson(elem);
                    break;
                case 'book':
                    cache[i] = __WEBPACK_IMPORTED_MODULE_4__model_book_model__["a" /* Book */].fromJson(elem);
                    break;
                case 'loan':
                    cache[i] = __WEBPACK_IMPORTED_MODULE_6__model_loan_model__["a" /* Loan */].fromJson(elem);
                    break;
            }
        }
    };
    /** Adds all entities from a given cache to  map of id to entity */
    CacheService.prototype.addToLinkMap = function (cache) {
        for (var i = 0; i < cache.length; i++) {
            var entity = cache[i];
            var id = entity['id'];
            this.idToEntity[id] = entity;
        }
    };
    /**
     * Augments an entity with references to other entities identified by a "foreign key" field
     * in the entity. Such keys are named by the pattern <entity-name>Id.
     * Thus is an entity contains a foo.Id field, a reference to the foo object is added to
     * the entity with element name 'foo'
     * is
     */
    CacheService.prototype.resolveReferences = function (entity) {
        for (var elementName in entity) {
            if (elementName.indexOf('Id') > 0) {
                var foreignKey = entity[elementName];
                var referencedEntityType = elementName.substring(0, elementName.length - 2);
                var referencedEntity = this.idToEntity[foreignKey];
                if (referencedEntity) {
                    entity[referencedEntityType] = referencedEntity;
                }
            }
        }
    };
    /** Saves an entity to the server, and adds it to the cache */
    CacheService.prototype.save = function (type, entity) {
        var _this = this;
        var entityName = this.entityMap[type].entityName;
        this.server.create(entityName, entity).subscribe(function (response) {
            try {
                // var json = response.json();
                entity.id = response.json();
            }
            catch (error) {
                console.log("No id returned");
            }
            // Add it to the cache and key map          
            _this.entityMap[type].cache.push(entity);
            var id = entity['id'];
            _this.idToEntity[id] = entity;
            //         this.resolveReferences(entity);
        }, function (error) {
            console.log(error);
        });
    };
    /** Deletes an entity on the server, and removes it from the cache */
    CacheService.prototype.delete = function (type, entity) {
        var _this = this;
        var observable = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            var entityName = _this.entityMap[type].entityName;
            _this.server.delete(entityName, entity.id).subscribe(function (response) {
                _this.entityMap[type].cache = _this.entityMap[type].cache.filter(function (e) {
                    return this.id != e.id;
                }, { id: entity.id });
                delete _this.idToEntity[entity.id];
                observer.complete();
            }, function (error) {
                console.log(error);
            });
        });
        return observable;
    };
    return CacheService;
}());
CacheService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__server_service__["a" /* ServerService */]) === "function" && _a || Object])
], CacheService);

var _a;
//# sourceMappingURL=cache.service.js.map

/***/ }),

/***/ 203:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 203;


/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(213);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__new_catalog_new_catalog_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_catalog_edit_catalog_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__add_book_add_book_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ledger_ledger_component__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = (function () {
    function AppComponent(cacheService, utilitiesService, componentFactoryResolver, viewContainerRef) {
        this.cacheService = cacheService;
        this.utilitiesService = utilitiesService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.componentMap = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.utilitiesService.isMobileDevice()) {
            this.injectComponent(__WEBPACK_IMPORTED_MODULE_6__ledger_ledger_component__["a" /* LedgerComponent */]);
        }
        else {
            var observable = this.cacheService.initialize();
            observable.subscribe(function (next) { }, function (error) { }, function () {
                _this.initialize();
            });
        }
    };
    AppComponent.prototype.initialize = function () {
        $('#for-desktop').show();
        // Each of the five "tab component" has Map of values of the JQuery selectorscomponent argument to the activate() method below to
        // the corresponding Component object
        this.componentMap['#new-catalog'] = __WEBPACK_IMPORTED_MODULE_3__new_catalog_new_catalog_component__["a" /* NewCatalogComponent */];
        this.componentMap['#edit-catalog'] = __WEBPACK_IMPORTED_MODULE_4__edit_catalog_edit_catalog_component__["a" /* EditCatalogComponent */];
        this.componentMap['#add-book'] = __WEBPACK_IMPORTED_MODULE_5__add_book_add_book_component__["a" /* AddBookComponent */];
        this.componentMap['#ledger'] = __WEBPACK_IMPORTED_MODULE_6__ledger_ledger_component__["a" /* LedgerComponent */];
    };
    /** Activates the component selected from the tab by dynamically injecting it
     * @param component the selector of the root element of the component
     */
    AppComponent.prototype.activate = function (componentSelector) {
        // First remove the current activated component unless it is the same one
        if (this.activeComponentSelector) {
            if (componentSelector == this.activeComponentSelector) {
                // COmponent is already selected and visible
                return;
            }
            $(this.activeComponentSelector).remove();
        }
        // Create and inject the component 
        this.injectComponent(this.componentMap[componentSelector]);
        // Record it 
        this.activeComponentSelector = componentSelector;
    };
    AppComponent.prototype.injectComponent = function (component) {
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        var ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(472),
        styles: [__webpack_require__(467)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__utilities_service__["a" /* UtilitiesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__utilities_service__["a" /* UtilitiesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cache_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BorrowerPicklistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BorrowerPicklistComponent = (function () {
    function BorrowerPicklistComponent(cacheService) {
        this.cacheService = cacheService;
        this.borrowerSelectionStarted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.borrowerSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.value = '';
        this.borrowerMap = {};
        this.borrowers = [];
        this.allBorrowers = [];
        this.optionList = [];
    }
    Object.defineProperty(BorrowerPicklistComponent.prototype, "reset", {
        get: function () {
            return null;
        },
        set: function (value) {
            this.value = '';
            $('.dropdown').hide();
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    BorrowerPicklistComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    /** Called when user clicks in the text field  */
    BorrowerPicklistComponent.prototype.onClickText = function () { this.resetPicker(); };
    /**
     * Called on keydown in the text field.
     * At this point the field value will not yet have received the character
     */
    BorrowerPicklistComponent.prototype.onKeydown = function (ev) {
        var key = ev.key;
        // Filter out all items which do not partial match the input value
        if (key == 'Backspace') {
            // Must restore list to full set before filtering
            this.optionList = this.createOptionList(this.allBorrowers);
            // With Backspace must ignore the last character, since it has not yet been removed
            this.optionList = this.optionList.filter(function (option) { return option.toUpperCase().startsWith(this.value.substr(0, this.value.length - 1).toUpperCase()); }, this);
        }
        else if (key == "Delete") {
            this.resetPicker();
        }
        else {
            // For normal character, must append it to the value, since it has not yet ben added
            this.optionList = this.optionList.filter(function (option) { return option.toUpperCase().startsWith(this.value.toUpperCase() + key.toUpperCase()); }, this);
            this.borrowerSelectionStarted.emit(null);
        }
        this.populatePicker();
        // Will not have been visible before first keystroke
        $('.dropdown').css('display', 'block');
    };
    /** Called when user clicks on picklist */
    BorrowerPicklistComponent.prototype.onClick = function (me) {
        this.value = me.target.text;
        $('.dropdown').css('display', 'none');
        var borrower = this.borrowerMap[this.value];
        // Reset the pick list 
        this.optionList = this.createOptionList(this.allBorrowers);
        this.populatePicker();
        this.borrowerSelected.emit(borrower);
    };
    /** Retrieves full list of borrowers from the cache and initializes the picklist */
    BorrowerPicklistComponent.prototype.refresh = function () {
        // Get the borrowers from the cache 
        this.allBorrowers = this.cacheService.getBorrowers();
        // Create list options array
        this.optionList = this.createOptionList(this.allBorrowers);
        // Populate the picker with the entire list
        this.populatePicker();
        // Create map of the option strings to the Borrower objects
        for (var i = 0; i < this.optionList.length; i++) {
            this.borrowerMap[this.optionList[i]] = this.allBorrowers[i];
        }
    };
    BorrowerPicklistComponent.prototype.resetPicker = function () {
        // Clear the field and restore the full list
        this.value = '';
        this.optionList = this.createOptionList(this.allBorrowers);
        this.borrowerSelectionStarted.emit(null);
    };
    /** Creates the html for all the <option> elements in the picklist */
    BorrowerPicklistComponent.prototype.populatePicker = function () {
        var optionHtml = '';
        for (var i = 0; i < this.optionList.length; i++) {
            var option = this.optionList[i];
            optionHtml = optionHtml.concat('<option value="').concat(option).concat('">').concat(option).concat('</option>');
        }
        $('.dropdown').html(optionHtml);
    };
    /** Creates array of string represntations of each borrower */
    BorrowerPicklistComponent.prototype.createOptionList = function (borrowers) {
        var optionList = [];
        for (var i = 0; i < borrowers.length; i++) {
            var b = borrowers[i];
            optionList.push(b.name + ' ' + b.surname + ' ' + b.location);
        }
        return optionList;
    };
    return BorrowerPicklistComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], BorrowerPicklistComponent.prototype, "reset", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BorrowerPicklistComponent.prototype, "borrowerSelectionStarted", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BorrowerPicklistComponent.prototype, "borrowerSelected", void 0);
BorrowerPicklistComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-borrower-picklist',
        template: __webpack_require__(474)
    })
    /**
     * A "look ahead" picklist for selecting a borrower. As characters are entered in the
     * text <input> element, the options in the <select> element are filtered to match the partial
     * text value
     */
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cache_service__["a" /* CacheService */]) === "function" && _a || Object])
], BorrowerPicklistComponent);

var _a;
//# sourceMappingURL=borrower-picklist.component.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__server_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__cache_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utilities_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ledger_ledger_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__new_catalog_new_catalog_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__add_book_add_book_component__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__edit_catalog_edit_catalog_component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ledger_borrower_picklist_borrower_picklist_component__ = __webpack_require__(212);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var AppModule = AppModule_1 = (function () {
    function AppModule(injector) {
        AppModule_1.injector = injector;
    }
    return AppModule;
}());
AppModule = AppModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__ledger_ledger_component__["a" /* LedgerComponent */],
            __WEBPACK_IMPORTED_MODULE_10__new_catalog_new_catalog_component__["a" /* NewCatalogComponent */],
            __WEBPACK_IMPORTED_MODULE_11__add_book_add_book_component__["a" /* AddBookComponent */],
            __WEBPACK_IMPORTED_MODULE_12__edit_catalog_edit_catalog_component__["a" /* EditCatalogComponent */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__["FileSelectDirective"], __WEBPACK_IMPORTED_MODULE_4_ng2_file_upload__["FileDropDirective"], __WEBPACK_IMPORTED_MODULE_13__ledger_borrower_picklist_borrower_picklist_component__["a" /* BorrowerPicklistComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        // Entry components are those which will be lazy loaded
        entryComponents: [__WEBPACK_IMPORTED_MODULE_10__new_catalog_new_catalog_component__["a" /* NewCatalogComponent */], __WEBPACK_IMPORTED_MODULE_11__add_book_add_book_component__["a" /* AddBookComponent */], __WEBPACK_IMPORTED_MODULE_12__edit_catalog_edit_catalog_component__["a" /* EditCatalogComponent */], __WEBPACK_IMPORTED_MODULE_9__ledger_ledger_component__["a" /* LedgerComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_6__server_service__["a" /* ServerService */], __WEBPACK_IMPORTED_MODULE_7__cache_service__["a" /* CacheService */], __WEBPACK_IMPORTED_MODULE_8__utilities_service__["a" /* UtilitiesService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injector"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injector"]) === "function" && _a || Object])
], AppModule);

var AppModule_1, _a;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ServerService = (function () {
    function ServerService(http) {
        this.http = http;
        console.log(document.baseURI);
        if (document.baseURI == "http://localhost:4200/") {
            // Client loaded from VSCode local server 
            this.baseUrl = "http://localhost:8888/rest/";
        }
        else {
            // CLient loaded from local or remote App Engine server
            this.baseUrl = document.baseURI + "rest/";
        }
    }
    ServerService.prototype.getAll = function (entityName) {
        var url = this.baseUrl + entityName;
        return this.http.get(url);
    };
    ServerService.prototype.create = function (entityName, entity) {
        var url = this.baseUrl + entityName;
        var converted = this.convertFields(entity);
        return this.http.post(url, converted);
    };
    ServerService.prototype.delete = function (entityName, entityId) {
        var url = this.baseUrl + entityName + '/' + entityId;
        return this.http.delete(url);
    };
    /** Fetchees the pdf of a single book*/
    ServerService.prototype.fetchBookPdf = function (bookId) {
        var url = this.baseUrl + 'book/' + bookId;
        window.open(url, "_blank");
    };
    /** Fetchees the pdf of an entire catalog*/
    ServerService.prototype.fetchCatalogPdf = function (catalogId) {
        var url = this.baseUrl + 'catalog/' + catalogId;
        window.open(url, "_blank");
    };
    /** Fetches ledger PDF */
    ServerService.prototype.fetchLedgerPdf = function () {
        var url = this.baseUrl + 'ledger';
        window.open(url, "_blank");
    };
    // default output of date is yyyy-mm-ddThh:mm:ss.sssZ (ISO-8601)
    ServerService.prototype.convertFields = function (entity) {
        var converted = {};
        for (var e in entity) {
            var element = entity[e];
            if (typeof element == "function") {
                continue;
            }
            if (typeof element == 'string') {
                if (element.length == 10 && element.match("[0-9]{4}-[0-9]{2}-[0-9]{2}")) {
                    var parts = element.split('-');
                    var date = new Date();
                    date.setFullYear(+parts[0], (+parts[1]) - 1, +parts[2]);
                    var s = this.convertDate(date);
                    converted[e] = s;
                    continue;
                }
                else if (element.length == 5 && element.match("[0-9]{2}:[0-9]{2}")) {
                    var parts = element.split(':');
                    var date = new Date();
                    date.setHours(+parts[0], +parts[1]);
                    var s = this.convertDate(date);
                    converted[e] = s;
                    continue;
                }
            }
            else if (element instanceof Date) {
                var s = this.convertDate(element);
                converted[e] = s;
                continue;
            }
            if (e != "cache" && e != "cacheService") {
                converted[e] = element;
            }
        }
        return converted;
    };
    /** Converts a Date to a string formatted as "yyyy-mm-ddThh:mm:ssZ" */
    ServerService.prototype.convertDate = function (date) {
        var s = date.toISOString();
        var l = s.length;
        s = s.substr(0, l - 5) + 'Z';
        return s;
    };
    return ServerService;
}());
ServerService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ServerService);

var _a;
//# sourceMappingURL=server.service.js.map

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(64)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 471:
/***/ (function(module, exports) {

module.exports = "<form class=\"form-horizontal selectable-component centered\" id=\"add-book\" style=\"width:40em\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-body\">\n      To catalog a book, first select the catalog, then enter a book number. The default value shown is just the next one in sequence\n      after the value of the highest number in the catalog. (If you are cataloging a book which is already in the manual system, you may want\n      to retain the original number.)\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-4\" for=\"xx\">Select Catalog:</label>\n      <div class=\"col-sm-4\">\n        <select class=\"form-control\" id=\"sel1\" name=\"catalog\" [(ngModel)]=\"selectedCatalog\" (change)=\"selectCatalog()\" style=\"width:10em;\">\n        <option *ngFor=\"let c of catalogs\">\n          {{c.language}}\n        </option>\n      </select>\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-4\" for=\"id\">Book Number:</label>\n      <div class=\"col-sm-4\">\n        <input type=\"text\" class=\"form-control\" id=\"id\" name=\"bookNumber\" [(ngModel)]=\"bookNumber\" style=\"width:10em;\"><!-- (change)=\"enableAdd()\" -->\n       </div>\n      <div class=\"col-sm-4\">\n        <span style=\"color:red\">{{numberError}}</span>\n     </div>\n    </div>\n    <div class=\"panel-body\">\n      <div class=\"col-sm-offset-4 col-sm-8\">\n        <button type=\"button\" id=\"add-to-catalog\" class=\"btn\" name=\"add\" (click)=\"add()\">Add Book to Catalog</button><!-- disabled -->\n      </div>\n    </div>\n  </div>\n  <!-- Upload area visible only after book is registered -->\n  <div id=\"image-entry\" class=\"panel panel-default\" style=\"display:none;\">\n    <div class=\"panel-body\">\n      You can now upload the cover images, then generate a catalog page pdf file. This isn't necessary if the the catalog page already\n      exists for this book.\n      <p style=\"margin-top: 0.5em\">\n        If you don't have the cover images now, you can upload them and generate the pdf later on the \"Edit a Catalog\" tab. If \n        you select and upload the wrong image, you can just repeat the operation before downloading the pdf.\n      </p>\n      <p>\n      Note: If you've uploaded an image, there is a short delay before it it is available for generating the PDF document. \n      If the page is incomplete, just wait a few seconds, then click the Download Catalog Page button again.\n      </p>\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-3\" for=\"upload-front\">Front Cover:</label>\n      <div class=\"col-sm-6\">\n        <input type=\"file\" ng2FileSelect [uploader]=\"uploader\"/>\n      </div>\n      <div class=\"col-sm-3\">\n        <button type=\"button\" class=\"btn btn-success btn-xs\" (click)=\"uploadImage('front')\">\n            <span class=\"glyphicon glyphicon-upload\"></span> Upload\n          </button>\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-3\" for=\"upload-front\">Back Cover:</label>\n      <div class=\"col-sm-6\">\n        <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" style=\"display: inline\" />\n      </div>\n      <div class=\"col-sm-3\">\n        <button type=\"button\" class=\"btn btn-success btn-xs\" style=\"display: inline\" (click)=\"uploadImage('back')\">\n            <span class=\"glyphicon glyphicon-upload\"></span> Upload\n          </button>\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      Note: There is a short delay between when the images are uploaded and when they can be used to generate the page. If the page is incomplete, just wait half a minute or so, then click the Download button again.\n    </div>\n    <div class=\"panel-body\">\n      <div class=\"col-sm-offset-4 col-sm-8\">\n        <button type=\"button\" id=\"download\" class=\"btn\" name=\"add\" (click)=\"downloadPdf()\" disabled>Download Catalog Page</button>\n      </div>\n    </div>\n  </div>\n</form>"

/***/ }),

/***/ 472:
/***/ (function(module, exports) {

module.exports = "<div id=\"for-desktop\" style=\"display:none;\" class=\"container\">\n  <ul class=\"nav nav-tabs\">\n    <li><a data-toggle=\"tab\" href=\"#create-catalog\"   (click)=\"activate('#new-catalog')\">Create New Catalog</a></li>\n    <li><a data-toggle=\"tab\" href=\"#add-book\"         (click)=\"activate('#add-book')\">Add Book to Catalog</a></li>\n    <li><a data-toggle=\"tab\" href=\"#edit-catalog\"     (click)=\"activate('#edit-catalog')\">Edit a Catalog</a></li>\n    <li><a data-toggle=\"tab\" href=\"#view-ledger\"      (click)=\"activate('#ledger')\">Borrowers</a></li>\n  </ul>\n</div>\n\n<div id=\"initialize-progress\"  class=\"container\" style=\"margin-top: 5em\">\n  Initializing \n  <progress value=\"0\" max=\"4\" class=\"centered\" ></progress>\n</div>\n\n"

/***/ }),

/***/ 473:
/***/ (function(module, exports) {

module.exports = "<form class=\"form-horizontal selectable-component centered\" id=\"edit-catalog\" style=\"width:40em\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-body\">\n      On this page, you can upload cover images for a book already registered in the catalog, and generate the catalog page pdf\n      for the book. You can also generate a pdf with all pages of the catalog. If you select and upload the wrong image,\n      you can just repeat the operation\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-4\" for=\"xx\">Select Catalog:</label>\n      <div class=\"col-sm-4\">\n        <select class=\"form-control\" id=\"sel1\" name=\"catalog\" [(ngModel)]=\"selectedCatalog\" (change)=\"selectCatalog()\" style=\"width:10em;\">\n        <option *ngFor=\"let c of catalogs\">\n          {{c.language}}\n        </option>\n      </select>\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-4\" for=\"xx\">Select Book:</label>\n      <div class=\"col-sm-4\">\n        <select class=\"form-control\" id=\"sel1\" name=\"book\" [(ngModel)]=\"selectedBook\" style=\"width:10em;\">\n        <option *ngFor=\"let tag of bookTags\">\n          {{tag}}\n        </option>\n      </select>\n      </div>\n      <div class=\"col-sm-3 col-sm-offset-1\">\n        <button type=\"button\" id=\"remove\" name=\"rmove\" class=\"btn btn-info btn-xs\" data-toggle=\"modal\" data-target=\"#myModal\" disabled>Remove</button>\n      </div>\n    </div>\n    <!-- Popup dialog for removal confirmation -->\n    <div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            <h4 class=\"modal-title\">Remove Book</h4>\n          </div>\n          <div class=\"modal-body\">\n            <p>Are you sure you want to remove book {{this.bookNumber}} from the catalog?</p>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"removeBook()\">Yes</button>\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n          </div>\n        </div>\n\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-3\" for=\"upload-front\">Front Cover:</label>\n      <div class=\"col-sm-6\">\n        <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" />\n      </div>\n      <div class=\"col-sm-3\">\n        <button type=\"button\" class=\"btn btn-success btn-xs\" (click)=\"uploadImage('front')\">\n            <span class=\"glyphicon glyphicon-upload\"></span> Upload\n          </button>\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-3\" for=\"upload-front\">Back Cover:</label>\n      <div class=\"col-sm-6\">\n        <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" style=\"display: inline\" />\n      </div>\n      <div class=\"col-sm-3\">\n        <button type=\"button\" class=\"btn btn-success btn-xs\" style=\"display: inline\" (click)=\"uploadImage('back')\">\n            <span class=\"glyphicon glyphicon-upload\"></span> Upload\n          </button>\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      Note: If you've uploaded an image, there is a short delay before it it is available for generating the PDF document. \n      If the page is incomplete, just wait a few seconds, then click the Download Catalog Page button again.\n    </div>\n    <div class=\"panel-body\">\n      <div class=\"col-sm-offset-4 col-sm-8\">\n        <button type=\"button\" class=\"btn\" id=\"download\" name=\"download\" (click)=\"downloadPdf()\">Download Catalog Page</button>\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <div class=\"col-sm-offset-4 col-sm-8\">\n        <button type=\"button\" class=\"btn\" id=\"download-all\" name=\"downloadAll\" (click)=\"downloadAllPdf()\" disabled=\"true\">Download Entire Catalog</button>\n      </div>\n    </div>\n  </div>\n</form>"

/***/ }),

/***/ 474:
/***/ (function(module, exports) {

module.exports = "<div class=\"centered\" >\n  <!-- Text input linked to the pick list -->\n  <div>\n    <input type=\"text\" (keydown)=\"onKeydown($event)\" (click) = \"onClickText()\" [(ngModel)]=\"value\" class=\"picklist\">\n  </div>\n  <!-- Pick list visible only after user starts typing -->\n  <div>\n    <select name=\"picker\" id=\"picker\" size=\"10\" (click)=\"onClick($event)\" class=\"picklist dropdown\" style=\"display: none\" >\n    </select>\n  </div>\n</div>\n"

/***/ }),

/***/ 475:
/***/ (function(module, exports) {

module.exports = "<form class=\"form-horizontal selectable-component centered\" id=\"ledger\" style=\"width:25em\">\n  <!-- New Borrower Registration -->\n  <div class='button-stack'>\n    <button type=\"button\" id=\"add\" name=\"add\" class=\"btn btn-info centered\" data-toggle=\"collapse\" data-target=\"#new-borrower\" (click)=\"toggleNewBorrowerArea()\">Register New Borrower</button>\n  </div>\n  <div class=\"centered\">\n    <div id=\"new-borrower\" class=\"collapse panel panel-default\">\n      <div class=\"panel-body\">\n        <label for=\"\" class=\"col-sm-3\">Name</label>\n        <div class=\"col-sm-9\">\n          <input type=\"text\" name=\"name\" style=\"text-transform: capitalize\" [(ngModel)]=\"newBorrower.name\">\n        </div>\n      </div>\n      <div class=\"panel-body\">\n        <label for=\"\" class=\"col-sm-3\">Surname</label>\n        <div class=\"col-sm-9\">\n          <input type=\"text\" name=\"surnamename\" style=\"text-transform: capitalize\" [(ngModel)]=\"newBorrower.surname\">\n        </div>\n      </div>\n      <div class=\"panel-body\">\n        <label for=\"\" class=\"col-sm-3\">Location</label>\n        <div class=\"col-sm-9\">\n          <input type=\"text\" name=\"level\" style=\"text-transform: capitalize\" [(ngModel)]=\"newBorrower.location\">\n        </div>\n      </div>\n      <div class=\"panel-body\">\n        <button type=\"button\" class=\"btn btn-default centered\" (click)=\"addBorrower()\">Save</button>\n      </div>\n      <div class=\"panel-body\">  \n        <span>{{borrowerMessage}}</span>\n      </div>\n    </div>\n  </div>\n\n  <!-- Update Borrower TODO\n  <div class='button-stack'>\n    <button type=\"button\" id=\"update\" name=\"update\" class=\"btn btn-info centered\" data-toggle=\"collapse\" data-target=\"#update-borrower\" (click)=\"toggleUpdateBorrowerArea()\">Update Borrower's Info</button>\n  </div>\n  <div id=\"update-borrower\" class=\"collapse panel panel-default\" style=\"padding-bottom:2em\">\n    <div class=\"panel-body\">\n      <label class=\"col-sm-3\">Name</label>\n      <div class=\"col-sm-9\">\n    <app-borrower-picklist (borrowerSelected)=\"onBorrowerSelected($event)\" [reset]=\"resetBorrowerPicklist\"></app-borrower-picklist>\n      </div>\n    </div>\n\n    <!-- Visible only after borrower has been selected  \n    <div id=\"borrower-data\" class=\"centered\" style=\"display:none!important\">\n        <div class=\"panel-body\">\n          <label for=\"\" class=\"col-sm-3\">Name</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" name=\"name\" [(ngModel)]=\"selectedBorrower.name\">\n          </div>\n        </div>\n        <div class=\"panel-body\">\n          <label for=\"\" class=\"col-sm-3\">Surname</label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" name=\"surnamename\" [(ngModel)]=\"selectedBorrower.surname\">\n          </div>\n        </div>\n        <div class=\"panel-body\">\n          <label for=\"\" class=\"col-sm-3\">Location  </label>\n          <div class=\"col-sm-9\">\n            <input type=\"text\" name=\"level\" [(ngModel)]=\"selectedBorrower.location\">\n          </div>\n        </div>\n        <div class=\"panel-body\">\n          <button type=\"button\" class=\"btn btn-default centered\" (click)=\"updateBorrower()\" data-toggle=\"collapse\" data-target=\"#update-borrower\">Save</button>\n        </div>        \n     </div>\n  </div>\n  -->\n  <!-- Borrow and Return -->\n  <div class='button-stack'>\n    <button type=\"button\" id=\"br\" name=\"br\" class=\"btn btn-info centered\" data-toggle=\"collapse\" data-target=\"#borrow-return\" (click)=\"toggleBorrowReturnArea()\">Borrow or Return Book</button>\n  </div>\n  <div id=\"borrow-return\" class=\"collapse panel panel-default\" style=\"padding-bottom:2em\">\n    <div class=\"panel-body\">\n      <label class=\"col-sm-3\">Name</label>\n      <div class=\"col-sm-9\">\n        <app-borrower-picklist (borrowerSelected)=\"onBorrowerSelected($event)\" (borrowerSelectionStarted)=\"onBorrowerSelectionStarted($event)\" [reset]=\"resetBorrowerPicklist\"></app-borrower-picklist>\n      </div>\n      <div class=\"panel-body\">  \n        <span>{{loanMessage}}</span>\n      </div>\n    </div>\n\n    <!-- Visible only after borrower has been selected, and the borrower has a book on loan -->\n    <div id=\"borrower-status\" style=\"display:none\">\n      <div class=\"panel-body centered\">\n        <button type=\"button\" id=\"return\" class=\"btn centered\" name=\"return\" (click)=\"returnBook()\" data-toggle=\"collapse\" data-target=\"#borrow-return\">Return Book</button>\n      </div>\n    </div>\n\n    <!-- Visible only after borrower has been selected, and the borrower has no book on loan \"width:15em; margin-top:20px; -->\n    <div id=\"select-book\" class=\"centered\" style=\"display:none!important\">\n       <div class=\"panel-body\">\n        <label class=\"control-label col-sm-3\" for=\"xx\">Catalog:</label>\n        <div class=\"col-sm-9\">\n          <select class=\"form-control\" id=\"sel1\" name=\"catalog\" [(ngModel)]=\"selectedCatalog\" (change)=\"selectCatalog()\" style=\"width:10em;\">\n        <option *ngFor=\"let c of catalogs\">\n          {{c.language}}\n        </option>\n      </select>\n        </div>\n      </div>\n      <div class=\"panel-body\">\n        <label class=\"control-label col-sm-3\" for=\"xx\">Book:</label>\n        <div class=\"col-sm-9\">\n          <select class=\"form-control\" id=\"sel1\" name=\"book\" [(ngModel)]=\"selectedBook\" (change)=\"selectBook()\" style=\"width:10em;\">\n        <option *ngFor=\"let tag of bookTags\">\n          {{tag}}\n        </option>\n      </select>\n        </div>\n      </div>\n      <div class=\"panel-body\">\n        <button type=\"button\" id=\"borrow\" name=\"borrow\" class=\"btn centered\" (click)=\"borrowBook()\" disabled >Borrow Selected Book</button>\n      </div>\n    </div>\n  </div>\n  \n  <!-- Download Ledger -->\n  <div id=\"download-ledger\" class='button-stack' style=\"display:none;\" >\n    <button type=\"button\" id=\"dl\" name=\"dl\" class=\"btn btn-info centered\" (click)=\"downloadLedger()\">Download Ledger PDF</button>\n  </div>\n\n</form>"

/***/ }),

/***/ 476:
/***/ (function(module, exports) {

module.exports = "<form class=\"form-horizontal selectable-component centered\" id=\"new-catalog\" style=\"width:30em\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-body\">\n      <p>A catalog records all books of a given language.</p>\n      <p> To start a new catalog, enter the language and a prefix. All books in the catalog are identified by a tag comprising\n        the prefix followed by a number</p>\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-4\" for=\"language\">Language:</label>\n      <div class=\"col-sm-8\">\n        <input type=\"text\" class=\"form-control\" style=\"text-transform: capitalize\" id=\"language\" name=\"language\" [(ngModel)]=\"catalogLanguage\">\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <label class=\"control-label col-sm-4\" for=\"prefix\">Prefix:</label>\n      <div class=\"col-sm-8\">\n        <input type=\"text\" class=\"form-control\" style=\"text-transform: uppercase\" id=\"prefix\" name=\"prefix\" [(ngModel)]=\"catalogPrefix\">\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <div class=\"col-sm-offset-4 col-sm-8\">\n        <button type=\"button\" class=\"btn\" (click)=\"createCatalog()\">Create Catalog</button>\n      </div>\n    </div>\n    <div class=\"panel-body\">  \n      <span>{{message}}</span>\n    </div>\n  </div>\n</form>"

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(204);


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilitiesService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UtilitiesService = (function () {
    function UtilitiesService() {
    }
    // Thanks to the poster at https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
    UtilitiesService.prototype.isMobileDevice = function () {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
    ;
    return UtilitiesService;
}());
UtilitiesService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], UtilitiesService);

//# sourceMappingURL=utilities.service.js.map

/***/ })

},[503]);
//# sourceMappingURL=main.bundle.js.map