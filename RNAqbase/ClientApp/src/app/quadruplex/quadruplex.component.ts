import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import { ArcdiagramComponent } from '../arcdiagram/arcdiagram.component';
import { VisualizationComponent } from '../visualization/visualization.component';

@Component({
  selector: 'app-quadruplex',
  templateUrl: './quadruplex.component.html',
  styleUrls: ['./quadruplex.component.css']
})
export class QuadruplexComponent implements OnInit {

  data: Quadruplex = <Quadruplex>{ quadruplexesInTheSamePdb: [] };
  tetrads: TetradReference[];
  csvData: Quadruplex[] = [];


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

          this.http.get<number[]>(this.baseUrl +
            '' +
            'api/Quadruplex/GetQuadruplexesByPdbId?pdbId=' +
            this.data.pdbId +
            '&quadruplexId=' +
            this.data.id)
            .subscribe(result => {
              if (result) {
                this.data.quadruplexesInTheSamePdb = result;
              }
              else this.data.quadruplexesInTheSamePdb = [];

              this.http.get<TetradReference[]>(this.baseUrl + '' +
                'api/Tetrad/GetListOfTetrads?id=' + '' +
                this.quadruplexId)
                .subscribe(result => {
                  this.tetrads = result;
                  this.data.tetrads = this.tetrads.map(({ id }) => id);
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

}

interface Quadruplex {
  id: string;
  pdbId: number;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
  numberOfStrands: number;
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
}
