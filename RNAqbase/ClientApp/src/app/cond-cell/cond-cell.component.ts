import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Condition } from '../condition';

@Component({
  selector: 'app-cond-cell',
  templateUrl: './cond-cell.component.html',
  styleUrls: ['./cond-cell.component.css']
})
export class CondCellComponent {
  @Input('ID') attrID: string;
  @Input() condData: Condition;
  @Output() deleteEvent = new EventEmitter<Condition>();

  deleteClicked(event: boolean) {
    if (event)
      this.deleteEvent.emit(this.condData);
  }

}
