import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Condition } from '../condition';

@Component({
  selector: 'app-cond-seq-cell',
  templateUrl: './cond-seq-cell.component.html',
  styleUrls: ['./cond-seq-cell.component.css']
})
export class CondSeqCellComponent {

  @Input('name') elementName: string;
  @Input() condData: Condition;
  @Output() deleteEvent = new EventEmitter<Condition>();

  deleteClicked(event: boolean) {
    if (event)
      this.deleteEvent.emit(this.condData);
  }
}
