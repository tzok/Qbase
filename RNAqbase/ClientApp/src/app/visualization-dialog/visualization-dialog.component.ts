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
  zoomWidth: number;
  zoomHeight: number;
  public svgPic: any;

  @ViewChild('dataContainer') dataContainer: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<VisualizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.id = this.data.id;
    this.type = this.data.type;
    if(this.id.startsWith('H')){
      this.zoomHeight = 65;
      this.zoomWidth = 90;
    }
    else{
      this.zoomHeight = 85;
      this.zoomWidth = 75;
    }
    if(this.type == 'layers'){
      this.zoomHeight= 90;
      this.zoomWidth = 65;
    }
  }


  zoom_in() {
    this.zoomHeight += 10;
    this.zoomWidth += 10;
  }
  zoom_out(){
    this.zoomHeight -= 10;
    this.zoomWidth -= 10;
  }

}

interface DialogData {
  id: string;
  type: string;
}
