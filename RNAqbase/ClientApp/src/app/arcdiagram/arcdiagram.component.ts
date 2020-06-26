import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-arcdiagram',
  templateUrl: './arcdiagram.component.html',
  styleUrls: ['./arcdiagram.component.css']
})
export class ArcdiagramComponent implements OnInit {

  svg: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<ArcdiagramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArcDiagram, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(this.data.svg);
  }
}
interface ArcDiagram {
  svg: string;
}
