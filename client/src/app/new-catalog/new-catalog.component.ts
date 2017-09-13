import { Component, OnInit } from '@angular/core';
import { capitalize } from 'string';
import { CacheService } from '../cache.service';
import { Catalog } from '../model/catalog.model';

@Component({
  selector: 'app-new-catalog',
  templateUrl: './new-catalog.component.html'
})
export class NewCatalogComponent implements OnInit {

  catalogPrefix:string = "";
  catalogLanguage:string = "";
  message: string = '';

  private cache;

  constructor(private cacheService: CacheService) { }

  ngOnInit() {
    this.cache = this.cacheService.getCatalogs();
  }

  createCatalog() {
    this.catalogPrefix = this.catalogPrefix.toUpperCase();
    this.catalogLanguage = this.catalogLanguage.substr(0, 1).toUpperCase() + this.catalogLanguage.substring(1).toLowerCase();
    
    for (var i in this.cache){
      var catalog:Catalog = this.cache[i];
      if (catalog.id == this.catalogPrefix){
        this.message = "There is already a " + catalog.language + " catalog with prefix " + this.catalogPrefix;
        return;
      } 
    }
    var catalog = new Catalog(this.catalogPrefix, this.catalogLanguage);
    this.cacheService.save("catalogs", catalog);
    this.message = "Created catalog for " + this.catalogLanguage + " books";
    this.catalogPrefix = "";
    this.catalogLanguage = "";
  }
}
