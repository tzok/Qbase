import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  picture: any;
  image: string;
  sanitizedImageData: SafeResourceUrl;
  url = "http://nibiru.tbi.univie.ac.at/forna/forna.html?id=RNAcentral/URS0000000001";

  constructor(public dialogRef: MatDialogRef<VisualizationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.picture = this.data.bytePicture;
    this.getPicture();
  }

  getPicture(){
    this.image = 'data:image/png;base64,' + this.picture;
  }

}

interface DialogData {
  bytePicture: any;
}
