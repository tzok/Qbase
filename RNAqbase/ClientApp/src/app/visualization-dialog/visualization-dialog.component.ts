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

  id: any;
  type: any;
  zoom: number = 75;
  public svgPic: any;

  @ViewChild('dataContainer') dataContainer: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<VisualizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    //this.setId();
    //this.setSize()
    this.id = this.data.id;
    this.type = this.data.type;

  }

  setSvgPic() {
    this.svgPic = document.getElementById(this.data.id);
    console.log(this.svgPic);

  }
  zoomIn() {
    this.setSvgPic();
    this.zoom += 0.1;
    this.svgPic.style.zoom = this.zoom;
  }

  zoomOut() {
    this.setSvgPic();
    this.zoom -= 0.1;
    this.svgPic.style.zoom = this.zoom;
  }

  download(){
    svg.saveSvgAsPng(document.getElementById(this.data.id), 'VARNA_drawing.png');
  }

}

interface DialogData {
  id: string;
  type: string;
}
