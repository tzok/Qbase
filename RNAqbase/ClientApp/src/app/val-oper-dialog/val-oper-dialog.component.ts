import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-val-oper-dialog',
  templateUrl: './val-oper-dialog.component.html',
  styleUrls: ['./val-oper-dialog.component.css']
})
export class ValOperDialogComponent {
  operators: string[];
  constructor(
    public dialogRef: MatDialogRef<ValOperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
