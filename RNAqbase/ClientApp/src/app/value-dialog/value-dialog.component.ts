import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.css']
})
export class ValueDialogComponent {
  value = '';

  constructor(
    public dialogRef: MatDialogRef<ValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.data.conditions.push({ value: this.value, operator: '' });
    this.dialogRef.close(this.data);
  }

  buttonState(): boolean {
    return !(this.value.trim().length >= this.data.inputProperties.minLength);
  }
}
