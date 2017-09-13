import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ServerService } from './server.service';
import { Catalog } from './model/catalog.model';
import { Book } from './model/book.model';
import { Borrower } from './model/borrower.model';
import { Loan } from './model/loan.model';

declare var $: any;

@Injectable()
export class CacheService {

  private entityMap = {
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
  }

  private idToEntity = {};

  constructor(private server: ServerService) { }

  initialize() {
    const observable = Observable.create((observer: Observer<any>) => {
      this.server.getAll('catalog').subscribe(
        (response) => {
          this.entityMap['catalogs'].cache = response.json();
          this.convertToClasses(this.entityMap['catalogs'].cache, 'catalog');
          $("#initialize-progress progress").attr("value", 1);

          this.server.getAll('borrower').subscribe(
            (response) => {
              this.entityMap['borrowers'].cache = response.json();
              this.convertToClasses(this.entityMap['borrowers'].cache, 'borrower');
              $("#initialize-progress progress").attr("value", 2);

              this.server.getAll('book').subscribe(
                (response) => {
                  this.entityMap['books'].cache = response.json();
                  this.convertToClasses(this.entityMap['books'].cache, 'book');
                  $("#initialize-progress").attr("value", 3);

                  this.server.getAll('loan').subscribe(
                    (response) => {
                      this.entityMap['loans'].cache = response.json();
                      this.convertToClasses(this.entityMap['loans'].cache, 'loan');
                      $("#initialize-progress").hide();

                      this.addToLinkMap(this.entityMap['catalogs'].cache);
                      this.addToLinkMap(this.entityMap['borrowers'].cache);
                      this.addToLinkMap(this.entityMap['books'].cache);
                      this.addToLinkMap(this.entityMap['loans'].cache);

                      for (var key in this.idToEntity) {
                        var entity = this.idToEntity[key];
                        //                       this.resolveReferences(entity);
                      }
                      observer.complete();
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
    return observable;
  }

  getCatalogs() {
    return this.entityMap.catalogs.cache;
  }

  /** Returns array of borrowers sorted by name+surname */
  getBorrowers() {
    var names = [];
    var map = {};
    for (var i in this.entityMap.borrowers.cache) {
      var borrower: Borrower = this.entityMap.borrowers.cache[i];
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
  }

  /** Returns array of all books in a given catalog */
  getBooks(catalogId: string) {
    var books = [];
    for (var b in this.entityMap.books.cache) {
      var book: Book = this.entityMap.books.cache[b];
      if (book.catalogId == catalogId) {
        books.push(book);
      }
    }
    return books;
  }

  getLoans() {
    return this.entityMap.loans.cache;
  }

  getBook(bookId: number) {
    return this.idToEntity[bookId];
  }
  /*
  removeBook(catalogId: string, bookNumber: string) {
    var bookNumber = bookId.substr(catalogId)
    var catalogId = this.languageToPrefix[this.selectedCatalog.trim()];
    var bookNumber = this.selectedBook.substr(catalogId.length);
    var url = this.serverService.baseUrl + "book/" + catalogId + "/" + bookId;
  }
*/
  /** Converts JSON representation of an entity into an object of the entity'e class */
  private convertToClasses(cache: any, type: string) {
    for (var i in cache) {
      var elem = cache[i];
      switch (type) {
        case 'catalog': cache[i] = Catalog.fromJson(elem); break;
        case 'borrower': cache[i] = Borrower.fromJson(elem); break;
        case 'book': cache[i] = Book.fromJson(elem); break;
        case 'loan': cache[i] = Loan.fromJson(elem); break;
      }
    }
  }
  /** Adds all entities from a given cache to  map of id to entity */
  private addToLinkMap(cache) {
    for (var i = 0; i < cache.length; i++) {
      var entity = cache[i];
      var id = entity['id'];
      this.idToEntity[id] = entity;
    }
  }
  /**
   * Augments an entity with references to other entities identified by a "foreign key" field
   * in the entity. Such keys are named by the pattern <entity-name>Id.
   * Thus is an entity contains a foo.Id field, a reference to the foo object is added to
   * the entity with element name 'foo'
   * is  
   */
  private resolveReferences(entity) {
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
  }

  /** Saves an entity to the server, and adds it to the cache */
  save(type: string, entity: any) {
    var entityName = this.entityMap[type].entityName;
    this.server.create(entityName, entity).subscribe(
      (response) => {
        try {
          // var json = response.json();
          entity.id = response.json();
        }
        catch (error) {
          console.log("No id returned");
        }
        // Add it to the cache and key map          
        this.entityMap[type].cache.push(entity);
        var id = entity['id'];
        this.idToEntity[id] = entity;
        //         this.resolveReferences(entity);
      },
      (error) => {
        console.log(error)
      }
    );
  }

  /** Deletes an entity on the server, and removes it from the cache */
  delete(type: string, entity: any) {
    const observable = Observable.create((observer: Observer<any>) => {
      var entityName = this.entityMap[type].entityName;
      this.server.delete(entityName, entity.id).subscribe(
        (response) => {
          this.entityMap[type].cache = this.entityMap[type].cache.filter(function (e) {
            return this.id != e.id;
          }, { id: entity.id });
          delete this.idToEntity[entity.id];
          observer.complete();
        },
        (error) => {
          console.log(error)
        }
      );
    });
    return observable;
  }
}
