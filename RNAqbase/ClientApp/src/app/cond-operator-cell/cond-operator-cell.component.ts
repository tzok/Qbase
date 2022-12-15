import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Condition } from '../condition';
import { DialogChoice } from '../dialog-choice';

@Component({
  selector: 'app-cond-operator-cell',
  templateUrl: './cond-operator-cell.component.html',
  styleUrls: ['./cond-operator-cell.component.css']
})
export class CondOperatorCellComponent implements OnInit {
  @Input('name') elementName: string;
  @Input() condData: Condition;
  @Output() deleteEvent = new EventEmitter<Condition>();

  encodedOperator: string;

  ngOnInit() {
    this.encodedOperator = DialogChoice.decodeOperators(this.condData.operator);
  }

  deleteClicked(event: boolean) {
    if (event)
      this.deleteEvent.emit(this.condData);
  }
}
