import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Visualization3DComponent } from '../visualization3-d/visualization3-d.component';
import { ArcdiagramComponent } from '../arcdiagram/arcdiagram.component';
import {VisualizationDialogComponent} from '../visualization-dialog/visualization-dialog.component';
import { VisualizationComponent } from '../visualization/visualization.component';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import * as svg from 'save-svg-as-png';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 'app-tetrad',
  templateUrl: './tetrad.component.html',
  styleUrls: ['./tetrad.component.css']
})
export class TetradComponent implements OnInit {

  data: Tetrad;
  csvData: Tetrad[];
  tetradInformations: TetradCSVInformations;
  tetradId: number;
  sub;
  svg_varna: SafeHtml;
  svg_arc: SafeHtml;
  svg_varna_icon: SafeHtml;
  svg_arc_icon: SafeHtml;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.tetradId = +params.get('tetradId');

      this.http.get<Tetrad>(this.baseUrl + 'api/Tetrad/GetTetradById?id=' + this.tetradId).subscribe(result => {
        this.data = result;

        this.data.arcDiagram = this.setId(result.arcDiagram, '_arc');
        this.svg_arc = this.sanitizer.bypassSecurityTrustHtml(this.data.arcDiagram);
        this.data.arcDiagram_icon = this.setId(result.arcDiagram, '_arc');
        this.data.arcDiagram_icon = this.setSize(this.data.arcDiagram_icon);
        this.svg_arc_icon = this.sanitizer.bypassSecurityTrustHtml(this.data.arcDiagram_icon);


        this.data.visualization2D = this.setId(result.visualization2D, '_varna');
        this.svg_varna = this.sanitizer.bypassSecurityTrustHtml(this.data.visualization2D);
        this.data.visualization2D_icon = this.setId(result.visualization2D, '_varna');
        this.data.visualization2D_icon = this.setSize(this.data.visualization2D_icon);
        this.svg_varna_icon = this.sanitizer.bypassSecurityTrustHtml(this.data.visualization2D_icon);

        this.tetradInformations = {
          id: this.data.id,
          quadruplexId: this.data.quadruplexId,
          pdbIdentifier: this.data.pdbIdentifier,
          assemblyId: this.data.assemblyId,
          molecule: this.data.molecule,
          sequence: this.data.sequence,
          onzClass: this.data.onzClass,
          planarity: this.data.planarity,
          experiment: this.data.experiment,
          tetradsInTheSamePdb: '',
          tetradsInTheSameQuadruplex: '',
          dot_bracket: this.data.dot_bracket
        }

        this.http.get<number[]>(this.baseUrl + 'api/Tetrad/GetOtherTetradsInTheSamePdb?tetradId=' + this.data.id + '&pdbId=' + this.data.pdbId).subscribe(result => {
          if (result) {
            this.data.tetradsInTheSamePdb = result;
            this.tetradInformations.tetradsInTheSamePdb = result.join(";");

          }
          else{
           this.data.tetradsInTheSamePdb = [];
            this.tetradInformations.tetradsInTheSamePdb = '';
        }
           if (this.data.quadruplexId != '-') {
            this.http.get<number[]>(this.baseUrl + 'api/Tetrad/GetOtherTetradsInTheSameQuadruplex?tetradId=' + this.data.id + '&quadruplexId=' + this.data.quadruplexId).subscribe(result => {
              if (result) {
                this.data.tetradsInTheSameQuadruplex = result;
                this.tetradInformations.tetradsInTheSameQuadruplex = result.join(";");
              }
              else {
                this.data.tetradsInTheSameQuadruplex = [];
                this.tetradInformations.tetradsInTheSameQuadruplex = '';
              }
              this.csvData = [this.data];
            }, error => console.error(error));
          }
          else {
            this.csvData = [this.data];
            this.data.tetradsInTheSameQuadruplex = [];
          }
        }, error => console.error(error));
      }, error => console.error(error));

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showDotBracket() {
    let dialogRef = this.dialog.open(VisualizationComponent, {});
  }

  showStructure() {
    let dialogRef = this.dialog.open(Visualization3DComponent, {
      data: {
        pdbId: this.data.pdbIdentifier,
        url: this.baseUrl + 'api/tetrad/GetCifFile?tetradId=' + this.data.id
      }
    });
  }

  showVarna() {
    let diagram = this.dialog.open(VisualizationDialogComponent, { data: { svg: this.data.visualization2D, id: this.data.id.toString()} });
  }

  showDiagram() {
    let diagram = this.dialog.open(ArcdiagramComponent, { data: { svg: this.data.arcDiagram, id:this.data.id.toString() } });
  }

  setId(image: any, label: string) {
    let tmp = image.indexOf( "<svg" ) + 4;
    let id = " id=" + this.data.id + label;
    image = [image.slice(0, tmp), id, image.slice(tmp)].join('');
    return image;
  }

  setSize(image: any){
    let tmp = image.indexOf( "<svg" ) + 4;
    let id = " width=150px height=150px ";
    image = [image.slice(0, tmp), id, image.slice(tmp)].join('');
    return image;

  }

  saveZip(){
    let tetrad = this.generateFile([this.tetradInformations])
    let zip = new JSZip();
    zip.file("tetrad" + ".csv", tetrad);
    zip.generateAsync({type: "blob"}).then(function(content) {
      FileSaver.saveAs(content, "data.zip");
    });

    svg.saveSvgAsPng(document.getElementById(this.data.id.toString() + "_arc"), 'Arc_diagram.png');
    svg.saveSvgAsPng(document.getElementById(this.data.id.toString() + '_varna'), 'VARNA_drawing.png');
  }

  generateFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    return  new Blob([csvArray], {type: 'text/csv' })
  }

   setTwoNumberDecimal(num) {
     return (Math.round(num * 100) / 100).toFixed(2);
  };


}

interface Tetrad {
  id: number;
  quadruplexId: string;
  pdbId: number;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  onzClass: string;
  planarity: string;
  structure3D: string;
  tetradsInTheSameQuadruplex: number[];
  tetradsInTheSamePdb: number[];
  experiment: string;
  arcDiagram: string;
  visualization2D: string;
  arcDiagram_icon: string;
  visualization2D_icon: string;
  dot_bracket: string;
}


interface TetradCSVInformations {
  id: number;
  quadruplexId: string;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  onzClass: string;
  planarity: string;
  tetradsInTheSameQuadruplex: string;
  tetradsInTheSamePdb: string;
  dot_bracket: string;
  experiment: string;
}
