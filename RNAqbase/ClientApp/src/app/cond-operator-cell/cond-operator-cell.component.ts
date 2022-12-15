import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Condition } from '../condition';

@Component({
  selector: 'app-cond-operator-cell',
  templateUrl: './cond-operator-cell.component.html',
  styleUrls: ['./cond-operator-cell.component.css']
})
export class CondOperatorCellComponent {
  @Input('name') elementName: string;
  @Input() condData: Condition;
  @Input() operator: string;
  @Output() deleteEvent = new EventEmitter<Condition>();

  deleteClicked(event: boolean) {
    if (event)
      this.deleteEvent.emit(this.condData);
  }
}
