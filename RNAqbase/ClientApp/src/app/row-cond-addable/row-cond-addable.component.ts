import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Condition } from '../condition';
import { RowAttrPckt } from '../row-attr-pckt';
import { RowElements } from '../row-elements';
import { SnackbarDuplicateCondComponent } from '../snackbar-duplicate-cond/snackbar-duplicate-cond.component';

@Component({
  selector: 'app-row-cond-addable',
  templateUrl: './row-cond-addable.component.html',
  styleUrls: ['./row-cond-addable.component.css']
})

export class RowCondAddableComponent implements OnInit {
  rowData: RowElements;
  @Input() rowAttrID: string;
  @Input() rowAttrName: string;
  @Input() rowType: string;
  @Input() rowElements: RowElements;
  @Input() resetEvent: EventEmitter<any>;
  @Input() searchEvent: EventEmitter<any>;
  @Output() searchResponse = new EventEmitter<RowAttrPckt>();

  disableAddButton: boolean;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetEvent.subscribe(() => {
      this.handleResetReq();
    });
    this.searchEvent.subscribe(() => {
      this.handleSearchReq();
    });
    this.rowData = this.rowElements;
    this.checkCondCount();
  }

  addConditions(conds: Condition[]) {
    for (let cond of conds) {
      if (!this.rowData.conditions.some(element => JSON.stringify(element).toLowerCase() === JSON.stringify(cond).toLowerCase()))
        this.rowData.conditions.push(cond);
      else
        this.openSnackBar();
      this.checkCondCount();
    }
  }

  removeCond(cond: Condition) {
    var index = this.rowData.conditions.indexOf(cond);
    this.rowData.conditions.splice(index, 1);
    this.checkCondCount();
  }

  checkCondCount() {
    if (this.rowData.conditions.length == this.rowData.maxCondCount)
      this.disableAddButton = true;
    else
      this.disableAddButton = false;
  }
  
  handleResetReq() {
    this.rowData.conditions.splice(0);
    this.checkCondCount();
  }

  handleSearchReq() {
    this.searchResponse.emit({ attrID: this.rowAttrID, conditions: this.rowElements.conditions });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackbarDuplicateCondComponent, {
      duration: 2000,
    });
  }
}
