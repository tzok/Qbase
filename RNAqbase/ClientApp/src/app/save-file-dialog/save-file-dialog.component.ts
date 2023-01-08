import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface dialogData {
  checked: boolean;
}
@Component({
  selector: 'app-save-file-dialog',
  templateUrl: './save-file-dialog.component.html',
  styleUrls: ['./save-file-dialog.component.css']
})
export class SaveFileDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SaveFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
