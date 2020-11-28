import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
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

  @ViewChild('dataContainer') dataContainer: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<VisualizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.setId();
    this.setSize()
    this.svg = this.sanitizer.bypassSecurityTrustHtml(this.data.svg);
  }

  setSize(){
    let tmp = this.data.svg.indexOf( "<svg" ) + 4;
    let id = " width=500px height=500px ";
    this.data.svg = [this.data.svg.slice(0, tmp), id, this.data.svg.slice(tmp)].join('');
  }

  setSvgPic(){
    this.svgPic = document.getElementById(this.data.id);
  }

  zoomIn() {
    this.setSvgPic();
    this.zoom += 0.1;
    console.log(this.svgPic);
    this.svgPic.style.zoom = this.zoom;
  }

  zoomOut() {
    this.setSvgPic();
    this.zoom -= 0.1;
    this.svgPic.style.zoom = this.zoom;

  }

  setId() {
    let tmp = this.data.svg.indexOf( "<svg" ) + 4;
    let id = " id=" + this.data.id;
    this.data.svg = [this.data.svg.slice(0, tmp), id, this.data.svg.slice(tmp)].join('');
  }

  download(){
    svg.saveSvgAsPng(document.getElementById(this.data.id), 'VARNA_drawing.png');
  }

}

interface DialogData {
  svg: string;
  id: string;
}
