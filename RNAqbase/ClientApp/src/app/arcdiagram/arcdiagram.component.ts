import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as svg from 'save-svg-as-png';

@Component({
  selector: 'app-arcdiagram',
  templateUrl: './arcdiagram.component.html',
  styleUrls: ['./arcdiagram.component.css']
})
export class ArcdiagramComponent implements OnInit {

  svg: SafeHtml;
  zoom: number = 1;
  svgPic: any;


  constructor(
    public dialogRef: MatDialogRef<ArcdiagramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArcDiagram, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.setId();
    this.setSize();
    this.svg = this.sanitizer.bypassSecurityTrustHtml(this.data.svg);
    console.log(this.svg);
  }

  setId() {
    let tmp = this.data.svg.indexOf( "<svg" ) + 4;
    let id = " id=" + this.data.id;
    this.data.svg = [this.data.svg.slice(0, tmp), id, this.data.svg.slice(tmp)].join('');
  }

  setSize(){
    let tmp = this.data.svg.indexOf( "<svg" ) + 4;
    let id = " width=600px height=400px ";
    this.data.svg = [this.data.svg.slice(0, tmp), id, this.data.svg.slice(tmp)].join('');
  }


  download(){
    console.log(document.getElementById(this.data.id));
    svg.saveSvgAsPng(document.getElementById(this.data.id), 'VARNA_drawing.png');
  }



}
interface ArcDiagram {
  svg: string;
  id: string;
}
