import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Condition } from '../condition';
import { DialogChoice } from '../dialog-choice';

@Component({
  selector: 'app-cond-seq-cell',
  templateUrl: './cond-seq-cell.component.html',
  styleUrls: ['./cond-seq-cell.component.css']
})
export class CondSeqCellComponent {
  @Input('ID') attrID: string;
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
