import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import { ArcdiagramComponent } from '../arcdiagram/arcdiagram.component';
import { VisualizationComponent } from '../visualization/visualization.component';
import * as JSZip from 'jszip';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as $ from 'jquery'
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-quadruplex',
  templateUrl: './quadruplex.component.html',
  styleUrls: ['./quadruplex.component.css']
})
export class QuadruplexComponent implements OnInit {

  data: Quadruplex = <Quadruplex>{ quadruplexesInTheSamePdb: [] };
  tetrads: TetradReference[];
  quadruplexInformations: QuadruplexInformations;
  csvData: Quadruplex[] = [];
  tetradsInformation: TetradInformations[] = [];
  tetradsPairsInformation: TetradPairsInformations[] = [];

  quadruplexId: string;
  sub;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.quadruplexId = params.get('quadruplexId');

      this.http.get<Quadruplex>(this.baseUrl + '' +
        'api/Quadruplex/GetQuadruplexById?id=' +
        '' + this.quadruplexId)
        .subscribe(result => {
          this.data.id = result.id;
          this.data.pdbId = result.pdbId;
          this.data.pdbIdentifier = result.pdbIdentifier;
          this.data.assemblyId = result.assemblyId;
          this.data.molecule = result.molecule;
          this.data.sequence = result.sequence;
          this.data.onzmClass = result.onzmClass;
          this.data.experiment = result.experiment;
          this.data.numberOfStrands = result.numberOfStrands;
          this.data.numberOfTetrads = result.numberOfTetrads;
          this.data.type = result.type;
          this.data.chiAngle = result.chiAngle;
          this.data.visualization2D = result.visualization2D;
          this.data.arcDiagram = result.arcDiagram;


          this.quadruplexInformations = {
            id: this.data.id,
            pdbId: this.data.pdbId,
            pdbIdentifier: this.data.pdbIdentifier,
            assemblyId: this.data.assemblyId,
            molecule: this.data.molecule,
            experiment: this.data.experiment,
            numberOfStrands: this.data.numberOfStrands,
            numberOfTetrads: this.data.numberOfTetrads,
            type: this.data.type,
            sequence: this.data.sequence,
            onzmClass: this.data.onzmClass,
            quadruplexesInTheSamePdb: '',
            tetrads: ''

          }

          this.http.get<number[]>(this.baseUrl +
            '' +
            'api/Quadruplex/GetQuadruplexesByPdbId?pdbId=' +
            this.data.pdbId +
            '&quadruplexId=' +
            this.data.id)
            .subscribe(result => {
              if (result) {
                this.data.quadruplexesInTheSamePdb = result;
                this.quadruplexInformations.quadruplexesInTheSamePdb = result.join(';');
              }
              else this.data.quadruplexesInTheSamePdb = [];

              this.http.get<TetradReference[]>(this.baseUrl + '' +
                'api/Tetrad/GetListOfTetrads?id=' + '' +
                this.quadruplexId)
                .subscribe(result => {
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
                    if (val.tetrad2_id != 0) {
                      this.tetradsPairsInformation.push({
                        TetradId: val.id,
                        TetradPairId: val.tetrad2_id,
                        twist: val.twist,
                        rise: val.rise,
                        direction: val.direction
                      });
                    }
                  }

                  this.data.tetrads = this.tetrads.map(({ id }) => id);
                  this.quadruplexInformations.tetrads = this.data.tetrads.join(';');
                  this.csvData = [this.data];
                }, error => console.error(error));
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
    let dialogRef = this.dialog.open(VisualizationDialogComponent, {});
  }

  showVarna() {
    let diagram = this.dialog.open(VisualizationDialogComponent, { data: { svg: this.data.visualization2D} });
  }

  showDiagram() {
    let diagram = this.dialog.open(ArcdiagramComponent, { data: { svg: this.data.arcDiagram } });
  }


  saveImage(){
    let diagram = { svg: this.data.arcDiagram } ;
    FileSaver.saveAs(diagram, "image.jpg");
  }

  saveZip(){
    let quadruplex = this.generateFile([this.quadruplexInformations])
    let tetrads = this.generateFile(this.tetradsInformation)
    let tetradsPairs = this.generateFile(this.tetradsPairsInformation)
    let zip = new JSZip();
    zip.file("quadruplex" + ".csv", quadruplex);
    zip.file("tetrads" + ".csv", tetrads);
    zip.file("tetradsPairs" + ".csv", tetradsPairs)
    zip.generateAsync({type: "blob"}).then(function(content) {
      FileSaver.saveAs(content, "data.zip");
    });

  }

  generateFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    return  new Blob([csvArray], {type: 'text/csv' })
  }

}

interface Quadruplex {
  id: string;
  pdbId: number;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
  numberOfStrands: string;
  numberOfTetrads: number;
  type: string;
  sequence: string;
  onzmClass: string;
  structure3D: string;
  quadruplexesInTheSamePdb: number[];
  chiAngle: string;
  tetrads: number[];
  arcDiagram: string;
  visualization2D: string;
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

interface QuadruplexInformations {
  id: string;
  pdbId: number;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
  numberOfStrands: string;
  numberOfTetrads: number;
  type: string;
  sequence: string;
  onzmClass: string;
  quadruplexesInTheSamePdb: string;
  tetrads: string;
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
