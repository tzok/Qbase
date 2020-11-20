import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
import { Visualization3DComponent } from '../visualization3-d/visualization3-d.component';
import { ArcdiagramComponent } from '../arcdiagram/arcdiagram.component';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import { VisualizationComponent } from '../visualization/visualization.component';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import * as svg from 'save-svg-as-png';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 'app-helix',
  templateUrl: './helix.component.html',
  styleUrls: ['./helix.component.css']
})


export class HelixComponent implements OnInit {

  data: HelixReference;
  tetrads: TetradReference[];
  tetradsInformation: TetradInformations[] = [];
  tetradsPairsInformation: TetradPairsInformations[] = [];
  quadruplexes: QuadruplexReference[];
  quadruplexInformation: QuadruplexReference[] = [];
  HelixReferenceInformations: HelixReferenceInformations;
  helixId: number;
  sub;
  svg_varna: SafeHtml;
  svg_arc: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog)
    { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.helixId = +params.get('helixId');

      this.http.get<HelixReference>(this.baseUrl + 'api/Helix/GetHelixReferenceById?id=' + this.helixId).subscribe(result => {

        this.data = result;
        this.data.tetradsIds = result.tetrads.join(";");
        this.data.quadruplexIds = result.quadruplexes.join(";")
        this.data.arcDiagram = this.setId(result.arcDiagram, '_arc');
        this.svg_arc = this.sanitizer.bypassSecurityTrustHtml(this.data.arcDiagram);
        this.data.visualization2D = this.setId(result.visualization2D, '_varna');
        this.svg_varna = this.sanitizer.bypassSecurityTrustHtml(this.data.visualization2D);

        this.HelixReferenceInformations = {
          id: this.data.id,
          pdbIdentifier: this.data.pdbIdentifier,
          assemblyId: this.data.assemblyId,
          molecule: this.data.molecule,
          experiment: this.data.experiment,
          sequence: this.data.sequence,
          numberOfStrands: this.data.numberOfStrands,
          numberOfQudaruplexes: this.data.numberOfQudaruplexes,
          numberOfTetrads: this.data.numberOfTetrads,
          tetradsIds: this.data.tetradsIds,
          quadruplexIds: this.data.quadruplexIds

        }

        this.http.get<TetradReference[]>(this.baseUrl + '' + 'api/Tetrad/GetListOfTetradsInHelix?id=' + '' + this.helixId).subscribe(result => {
          this.tetrads = result;

          for (let val of result) {
            this.tetradsInformation.push({
              id: val.id,
              sequence: val.sequence,
              onzClass: val.onzClass,
              planarity: val.planarity
              });
          }

          for (let val of result) {
            if(val.tetrad2_id != 0) {
              this.tetradsPairsInformation.push({
                TetradId: val.id,
                TetradPairId: val.tetrad2_id,
                twist: val.twist,
                rise: val.rise,
                direction: val.direction
              });
            }
          }

        }, error => console.error(error));

        this.http.get<QuadruplexReference[]>(this.baseUrl + '' + 'api/Quadruplex/GetListOfQuadruplex?id=' + '' + this.helixId).subscribe(result => {
          this.quadruplexes = result;

          for (let val of result) {
            this.quadruplexInformation.push({
              id: val.id,
              pdbIdentifier: val.pdbIdentifier,
              assemblyId: val.assemblyId,
              molecule: val.molecule,
              experiment: val.experiment,
              numberOfStrands: val.numberOfStrands,
              numberOfTetrads: val.numberOfTetrads,
              type: val.type,
              sequence: val.sequence,
              onzmClass: val.onzmClass
            });
          }
          }, error => console.error(error));


      }, error => console.error(error));

    });
  }

  setId(image: any, label: string) {
    let tmp = image.indexOf( "<svg" ) + 4;
    let id = " id=" + this.data.id + label;
    image = [image.slice(0, tmp), id, image.slice(tmp)].join('');
    return image;
  }

  saveZip(){
  let helix = this.generateFile([this.HelixReferenceInformations])
  let tetrads = this.generateFile(this.tetradsInformation)
  let tetradsPairs = this.generateFile(this.tetradsPairsInformation)
  let quadruplex = this.generateFile(this.quadruplexInformation)

  let zip = new JSZip();
  zip.file("helix" + ".csv", helix);
  zip.file("tetrads" + ".csv", tetrads);
  zip.file("tetradsPairs" + ".csv", tetradsPairs)
  zip.file("quadruplex" + ".csv", quadruplex)

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showStructure() {
    let dialogRef = this.dialog.open(Visualization3DComponent, {
      data: {
        pdbId: this.data.pdbId,
        url: this.baseUrl + 'api/Helix/GetHelix3dVisualizationMethod?id=' + this.data.id

      }
    });
  }

  showVarna() {
    let diagram = this.dialog.open(VisualizationDialogComponent, { data: { svg: this.data.visualization2D, id: this.data.id} });
  }

  showDiagram() {
    let diagram = this.dialog.open(ArcdiagramComponent, { data: { svg: this.data.arcDiagram, id: this.data.id } });
  }

  setTwoNumberDecimal(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  };


}

interface HelixReference {
  id: string;
  pdbId: string;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string
  sequence: string;
  numberOfStrands: string;
  numberOfQudaruplexes: number;
  numberOfTetrads: number;
  tetrads: number[];
  quadruplexes: number[];
  tetradsIds: string;
  quadruplexIds: string;
  visualization3D: any;
  arcDiagram: string;
  visualization2D: string;
}

interface HelixReferenceInformations {
  id: string;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string
  sequence: string;
  numberOfStrands: string;
  numberOfQudaruplexes: number;
  numberOfTetrads: number;
  tetradsIds: string;
  quadruplexIds: string;
}



interface QuadruplexReference {
  id: string;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
  numberOfStrands: string;
  numberOfTetrads: number;
  type: string;
  sequence: string;
  onzmClass: string;
}

interface TetradReference {
  id: number;
  sequence: string;
  onzClass: string;
  twist: number;
  rise: number;
  planarity: number;
  tetrad2_id: number;
  direction: string;
}

interface TetradInformations {
  id: number;
  sequence: string;
  onzClass: string;
  planarity: number;
}

interface TetradPairsInformations {
  TetradId: number;
  TetradPairId: number;
  twist: number;
  rise: number;
  direction: string;
}
