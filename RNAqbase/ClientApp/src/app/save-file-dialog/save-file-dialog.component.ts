import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-save-file-dialog',
  templateUrl: './save-file-dialog.component.html',
  styleUrls: ['./save-file-dialog.component.css']
})
export class SaveFileDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SaveFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
