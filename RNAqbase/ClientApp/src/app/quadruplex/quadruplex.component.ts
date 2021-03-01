import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import * as JSZip from 'jszip';
import { DomSanitizer } from '@angular/platform-browser';
import {Visualization3DComponent} from "../visualization3-d/visualization3-d.component";
import { saveAs } from "file-saver";

@Component({
  selector: 'app-quadruplex',
  templateUrl: './quadruplex.component.html',
  styleUrls: ['./quadruplex.component.css']
})
export class QuadruplexComponent implements OnInit {
  _3d_structure;
  _2d_structure_varna;
  _2d_structure_rchie;

  data: Quadruplex = <Quadruplex>{ quadruplexesInTheSamePdb: [] };
  tetrads: Tetrad[];
  csvData: Quadruplex;
  tetradsTable: TetradInformations[] = [];
  tetradsPairsTable: TetradPairsInformations[] = [];
  quadruplexId: string;
  sub;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.quadruplexId = params.get('quadruplexId');
      console.log(this.quadruplexId);
      this.http.get<Quadruplex>(this.baseUrl + '' + 'api/Quadruplex/GetQuadruplexById?id=' + '' + this.quadruplexId).subscribe(result => {
        this.data = result;
        this.data.id = 'Q' + this.data.id;
        this.csvData = JSON.parse(JSON.stringify(this.data));

        this.http.get<number[]>(this.baseUrl + '' + 'api/Quadruplex/GetQuadruplexesByPdbId?pdbId=' + this.data.pdbId +'&quadruplexId=' + this.quadruplexId).subscribe(result => {
            if (result) {
                this.data.quadruplexesInTheSamePdb = result;
                this.csvData.quadruplexesInTheSamePdb = result.join(';');
              }
              else this.data.quadruplexesInTheSamePdb = [];
              this.http.get<Tetrad[]>(this.baseUrl + '' + 'api/Tetrad/GetListOfTetrads?id=' + '' + this.quadruplexId).subscribe(result => {
                  this.tetrads = result;

                this.data.tetrads = this.tetrads.map(({ id }) => id);
                this.csvData.tetrads = this.data.tetrads.join(';');
                console.log(this.csvData)
                  for (let val of result) {
                    val.id = 'T' + val.id;
                    val.tetrad2_id = 'T' + val.tetrad2_id;
                  }

                  for (let val of result) {
                    if (val.tetrad2_id.slice(1) != 0) {
                      this.tetradsPairsTable.push({
                        TetradId: val.id,
                        TetradPairId: val.tetrad2_id,
                        twist: val.twist,
                        rise: val.rise,
                        direction: val.direction
                      });
                    }
                  }

                for (let val of result) {
                    this.tetradsTable.push({
                      id: val.id,
                      sequence: val.sequence,
                      onzClass: val.onzClass,
                      planarity: val.planarity
                    });
                }
                }, error => console.error(error));
            }, error => console.error(error));
        }, error => console.error(error));
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  show3dStructure() {
    let dialogRef = this.dialog.open(Visualization3DComponent, {
      data: {
        pdbId: this.data.pdbId,
        url: this.baseUrl + 'api/Quadruplex/GetQuadruplex3dVisualizationMethod?id=' + this.quadruplexId
      }
    });
  }

  show2dStructure(type: any) {
    let dialogRef = this.dialog.open(VisualizationDialogComponent, {
      data: { type: type, id: this.data.id },
    });
  }



  setTwoNumberDecimal(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  downloadZip(): void {
    this.http.get("/static/pymol/" + this.data.id + ".png", { responseType: "arraybuffer" })
      .subscribe(data => {
        this._3d_structure = data;

        this.http.get("/static/varna/" + this.data.id + ".svg", { responseType: "arraybuffer" })
          .subscribe(data => {
            this._2d_structure_varna = data;

            this.http.get("/static/rchie/" + this.data.id + ".svg", { responseType: "arraybuffer" })
              .subscribe(data => {
                this._2d_structure_rchie = data;

                var zip =new JSZip();
                let quadruplex = this.generateFile([this.csvData])
                let tetrads = this.generateFile(this.tetradsTable)
                let tetradsPairs = this.generateFile(this.tetradsPairsTable)

                zip.file("3d_structure.png", this._3d_structure);
                zip.file("2d_structure_varna.svg", this._2d_structure_varna);
                zip.file("2d_structure_rchie.svg", this._2d_structure_rchie);
                zip.file("quadruplex" + ".csv", quadruplex);
                zip.file("tetrads" + ".csv", tetrads);
                zip.file("tetradsPairs" + ".csv", tetradsPairs)
                zip.generateAsync({ type: "blob" })
                  .then(blob => saveAs(blob,'data.zip'));

              });
          });
      });
  }

  generateFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    return  new Blob([csvArray], {type: 'text/csv' })
  }
}

interface Quadruplex {
  id: any;
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
  quadruplexesInTheSamePdb: any;
  tetrads: any;
  dot_bracket: string;
}

interface Tetrad {
  id: any;
  sequence: string;
  onzClass: string;
  twist: number;
  rise: number;
  planarity: number;
  tetrad2_id: any;
  direction: string;
}

interface TetradInformations {
  id: any;
  sequence: string;
  onzClass: string;
  planarity: number;
}

interface TetradPairsInformations {
  TetradId: any;
  TetradPairId: any;
  twist: number;
  rise: number;
  direction: string;
}
