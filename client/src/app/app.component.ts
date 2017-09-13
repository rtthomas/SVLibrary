import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CacheService } from './cache.service';
import { UtilitiesService } from './utilities.service';
import { Book } from './model/book.model';
import { Borrower } from './model/borrower.model';
import { NewCatalogComponent } from './new-catalog/new-catalog.component';
import { EditCatalogComponent } from './edit-catalog/edit-catalog.component';
import { AddBookComponent } from './add-book/add-book.component';
import { LedgerComponent } from './ledger/ledger.component';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  activeComponentSelector;
  componentMap = [];

  constructor(
    private cacheService: CacheService,
    private utilitiesService: UtilitiesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {

    if (this.utilitiesService.isMobileDevice()) {
      this.injectComponent(LedgerComponent);
    }
    else {
      const observable: Observable<any> = this.cacheService.initialize();
      observable.subscribe(
        (next: any) => { },
        (error: any) => { },
        () => {
          this.initialize();
        }
      );
    }
  }

  private initialize() {
      $('#for-desktop').show();
      // Each of the five "tab component" has Map of values of the JQuery selectorscomponent argument to the activate() method below to
      // the corresponding Component object
      this.componentMap['#new-catalog'] = NewCatalogComponent;
      this.componentMap['#edit-catalog'] = EditCatalogComponent;
      this.componentMap['#add-book'] = AddBookComponent;
      this.componentMap['#ledger'] = LedgerComponent;
   }

  /** Activates the component selected from the tab by dynamically injecting it
   * @param component the selector of the root element of the component 
   */
  activate(componentSelector) {
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
  }

  private injectComponent(component){
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
}
