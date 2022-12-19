import { Component, Input, OnInit } from '@angular/core';
import { Condition } from '../condition';
import { RowElements } from '../row-elements';

@Component({
  selector: 'app-row-cond-addable',
  templateUrl: './row-cond-addable.component.html',
  styleUrls: ['./row-cond-addable.component.css']
})

export class RowCondAddableComponent implements OnInit {
  rowData: RowElements;
  @Input() rowName: string;
  @Input() rowType: string;
  @Input() rowElements: RowElements;
  disableAddButton: boolean;
  ngOnInit() {
    this.rowData = this.rowElements;
    this.checkCondCount();
  }

  addCondition(cond: Condition) {
    if (!this.rowData.conditions.some(element => JSON.stringify(element).toLowerCase() == JSON.stringify(cond).toLowerCase()))
      this.rowData.conditions.push(cond);
    else
      alert("Condition already exists!");
    this.checkCondCount();
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
}

