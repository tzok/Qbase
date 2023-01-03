import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-webba-da-silva-dialog',
  templateUrl: './webba-da-silva-dialog.component.html',
  styleUrls: ['./webba-da-silva-dialog.component.css']
})
export class WebbaDaSilvaDialogComponent {
  conditions: string[] = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'nineth', 'tenth'];
  constructor(
    public dialogRef: MatDialogRef<WebbaDaSilvaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
