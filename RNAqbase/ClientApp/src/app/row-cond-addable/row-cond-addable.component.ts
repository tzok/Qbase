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

  ngOnInit() {
    this.rowData = this.rowElements;
  }

  addCondition(cond: Condition) {
    this.rowData.conditions.push(cond);
  }
}
