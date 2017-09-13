import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Injector } from '@angular/core';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ServerService } from './server.service';
import { CacheService } from './cache.service';
import { UtilitiesService } from './utilities.service';
import { LedgerComponent } from './ledger/ledger.component';
import { NewCatalogComponent } from './new-catalog/new-catalog.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditCatalogComponent } from './edit-catalog/edit-catalog.component';
import { BorrowerPicklistComponent } from './ledger/borrower-picklist/borrower-picklist.component';

@NgModule({
  declarations: [
    AppComponent,
    LedgerComponent,
    NewCatalogComponent,
    AddBookComponent,
    EditCatalogComponent,
    FileSelectDirective, FileDropDirective, BorrowerPicklistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule    
  ],
  // Entry components are those which will be lazy loaded
  entryComponents: [NewCatalogComponent, AddBookComponent, EditCatalogComponent, LedgerComponent],
  providers: [ServerService, CacheService, UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule {
    /**
     * Allows for retrieving singletons using `AppModule.injector.get(MyService)`
     * (whereas `ReflectiveInjector.resolveAndCreate(MyService)` would create a
     * new instance of the service).
     */
    static injector: Injector;

    constructor(injector: Injector) {
        AppModule.injector = injector;
    }  
}
