import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Borrower } from '../../model/borrower.model';
import { CacheService } from '../../cache.service';

declare var $: any;

@Component({
  selector: 'app-borrower-picklist',
  templateUrl: './borrower-picklist.component.html'
})

/** 
 * A "look ahead" picklist for selecting a borrower. As characters are entered in the 
 * text <input> element, the options in the <select> element are filtered to match the partial 
 * text value
 */
export class BorrowerPicklistComponent implements OnInit {

  @Input() set reset(value: boolean){
    this.value = '';
    $('.dropdown').hide();
    this.refresh();
  }
  get reset(): boolean{
    return null;
  }

  @Output() borrowerSelectionStarted = new EventEmitter<any>();
  @Output() borrowerSelected = new EventEmitter<Borrower>();

  value = '';
  borrowerMap = {}
  borrowers = [];
  allBorrowers = [];
  optionList = [];

  constructor(private cacheService: CacheService) { }

  ngOnInit() {
    this.refresh();
  }

  /** Called when user clicks in the text field  */
  onClickText(){this.resetPicker();}
  
  /** 
   * Called on keydown in the text field. 
   * At this point the field value will not yet have received the character
   */
  onKeydown(ev) {
    var key = ev.key;
    // Filter out all items which do not partial match the input value
    if (key == 'Backspace') {
      // Must restore list to full set before filtering
      this.optionList = this.createOptionList(this.allBorrowers);
      // With Backspace must ignore the last character, since it has not yet been removed
      this.optionList = this.optionList.filter(function (option) { return option.toUpperCase().startsWith(this.value.substr(0, this.value.length - 1).toUpperCase()); }, this);
    }
    else if (key == "Delete"){
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
  }

  /** Called when user clicks on picklist */
  onClick(me) {
    this.value = me.target.text;
    $('.dropdown').css('display', 'none');
    var borrower:Borrower = this.borrowerMap[this.value];

    // Reset the pick list 
    this.optionList = this.createOptionList(this.allBorrowers);
    this.populatePicker();
    this.borrowerSelected.emit(borrower);
  }

  /** Retrieves full list of borrowers from the cache and initializes the picklist */
  private refresh(){
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
  }
  
  private resetPicker(){
    // Clear the field and restore the full list
    this.value = '';
    this.optionList = this.createOptionList(this.allBorrowers);
    this.borrowerSelectionStarted.emit(null);
  }

  /** Creates the html for all the <option> elements in the picklist */
  private populatePicker() {
    var optionHtml = '';
    for (var i = 0; i < this.optionList.length; i++) {
      var option = this.optionList[i];
      optionHtml = optionHtml.concat('<option value="').concat(option).concat('">').concat(option).concat('</option>');
    }
    $('.dropdown').html(optionHtml);
  }

  /** Creates array of string represntations of each borrower */
  private createOptionList(borrowers) {
    var optionList = [];
    for (var i = 0; i < borrowers.length; i++) {
      var b = borrowers[i]; 
      optionList.push(b.name + ' ' + b.surname + ' ' + b.location);
    }
    return optionList;
  }
}
