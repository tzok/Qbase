import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-date-oper-dialog',
  templateUrl: './date-oper-dialog.component.html',
  styleUrls: ['./date-oper-dialog.component.css']
})
export class DateOperDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DateOperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
