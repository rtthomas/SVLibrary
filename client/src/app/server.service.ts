import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class ServerService {

  baseUrl;
  
  constructor(private http: Http) {
    console.log(document.baseURI);
    if (document.baseURI == "http://localhost:4200/"){
      // Client loaded from VSCode local server 
      this.baseUrl ="http://localhost:8888/rest/"; 
    }
    else {
      // CLient loaded from local or remote App Engine server
      this.baseUrl =  document.baseURI + "rest/";
    }
   }

  getAll(entityName: string){
      var url = this.baseUrl + entityName;
      return this.http.get(url);
  }

  create (entityName: string, entity: any){
    var url = this.baseUrl + entityName;
    var converted = this.convertFields(entity);
    return this.http.post(url, converted);    
  }

  delete(entityName: string,  entityId) {
    var url = this.baseUrl + entityName + '/' + entityId;
    return this.http.delete(url);
  }

  /** Fetchees the pdf of a single book*/
  fetchBookPdf(bookId: number){
    var url = this.baseUrl + 'book/' + bookId;
    window.open(url, "_blank");
  }

  /** Fetchees the pdf of an entire catalog*/
  fetchCatalogPdf(catalogId: string){
    var url = this.baseUrl + 'catalog/' + catalogId;
    window.open(url, "_blank");
  }

  /** Fetches ledger PDF */
  fetchLedgerPdf(){
    var url = this.baseUrl + 'ledger';
    window.open(url, "_blank");
  }

  // default output of date is yyyy-mm-ddThh:mm:ss.sssZ (ISO-8601)
  private convertFields(entity: any){
    var converted = {}
    for (var e in entity){
      var element = entity[e];
      if (typeof element == "function"){
        continue;
      }
      if (typeof element == 'string'){
        if (element.length == 10 && element.match("[0-9]{4}-[0-9]{2}-[0-9]{2}")){
          var parts = element.split('-');
          var date = new Date();
          date.setFullYear(+parts[0], (+parts[1]) - 1, +parts[2]);
          var s = this.convertDate(date);
          converted[e] = s;
          continue;
        } 
        else if (element.length == 5 && element.match("[0-9]{2}:[0-9]{2}")){
          var parts = element.split(':');
          var date = new Date();
          date.setHours(+parts[0], +parts[1]);
          var s = this.convertDate(date);
          converted[e] = s;
          continue;
        }
      }
      else if (element instanceof Date){
          var s = this.convertDate(element);
          converted[e] = s;
          continue;
      }
      if (e != "cache" && e != "cacheService"){
        converted[e] = element;
      }
    }
    return converted;
  }

  /** Converts a Date to a string formatted as "yyyy-mm-ddThh:mm:ssZ" */
  private convertDate(date: Date) {
    var s = date.toISOString();
    var l = s.length;
    s = s.substr(0, l - 5) +'Z';
    return s  
  }
}
