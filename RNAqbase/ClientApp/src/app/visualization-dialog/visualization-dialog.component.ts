import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as svg from 'save-svg-as-png';


@Component({
  selector: 'app-visualization-dialog',
  templateUrl: './visualization-dialog.component.html',
  styleUrls: ['./visualization-dialog.component.css']
})
export class VisualizationDialogComponent implements OnInit {

  svg: SafeHtml;
  zoom: number = 1;
  public svgPic: any;

  constructor(
    public dialogRef: MatDialogRef<VisualizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(this.data.svg);
    this.svgPic = document.getElementById('pic');
    this.svgPic.style.zoom += 1.5;
  }

  zoomIn() {
    this.zoom += 0.1;
    this.svgPic.style.zoom = this.zoom;
  }

  zoomOut() {
    this.zoom -= 0.1;
    this.svgPic.style.zoom = this.zoom;

  }

  download(data: any){
    svg.saveSvgAsPng(document.getElementById(data), 'VARNA_drawing.png');
  }

}

interface DialogData {
  svg: string;
}
