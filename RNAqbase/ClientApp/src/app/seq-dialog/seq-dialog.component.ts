import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-seq-dialog',
  templateUrl: './seq-dialog.component.html',
  styleUrls: ['./seq-dialog.component.css']
})
export class SeqDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SeqDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
