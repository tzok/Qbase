import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Condition } from '../condition';
import { DialogChoice } from '../dialog-choice';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent {
  @Input('name') elementName: string;
  @Input() content: string;
  @Input() rootAttribute: string;

  @Output() newConditionEvent = new EventEmitter<Condition>();

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogChoice.chooseDialog(this.rootAttribute), {
      data: {attr: this.rootAttribute, value: "", operator: "", operators: DialogChoice.chooseOperators(this.rootAttribute)}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.emitAddedCondition(result);
    });
  }

  emitAddedCondition(data: DialogData) {
    this.newConditionEvent.emit({ condition: data.value, operator: data.operator });
  }
}
