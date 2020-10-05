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
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-helix',
  templateUrl: './helix.component.html',
  styleUrls: ['./helix.component.css']
})
export class HelixComponent implements OnInit {

  data: HelixReference;

  tetrads: TetradReference[];
  quadruplexes: QuadruplexReference[];
  helixId: number;
  sub;


  csvHelix = new MatTableDataSource<HelixReference>();
  csvQuadruplex = new MatTableDataSource<QuadruplexReference>();
  csvTetrad = new MatTableDataSource<TetradReference>();


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog)
    { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.helixId = +params.get('helixId');

      this.http.get<HelixReference>(this.baseUrl + 'api/Helix/GetHelixReferenceById?id=' + this.helixId).subscribe(result => {
        this.data = result;
        this.csvHelix = new MatTableDataSource([result]);

        this.http.get<TetradReference[]>(this.baseUrl + '' + 'api/Tetrad/GetListOfTetrads?id=' + '' + this.helixId).subscribe(result => {
          this.tetrads = result;
          this.csvTetrad = new MatTableDataSource(result);
          }, error => console.error(error));

        this.http.get<QuadruplexReference[]>(this.baseUrl + '' + 'api/Quadruplex/GetListOfQuadruplex?id=' + '' + this.helixId).subscribe(result => {
          this.quadruplexes = result;
          this.data.numberOfQuadruplexes = this.quadruplexes.length;
          this.csvQuadruplex = new MatTableDataSource(result);
          }, error => console.error(error));


      }, error => console.error(error));

    });
  }

  downloadFile(data: any, filename: string) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    let blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, filename + '.csv');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

interface HelixReference {
  id: string;
  pdbId: string;
  assemblyId: number;
  molecule: string;
  experiment: string
  sequence: string;
  numberOfStrands: number;
  numberOfQuadruplexes: number;
  numberOfTetrads: number;
  tetrads: number[];
  quadruplexes: number[];
  //visualization2D: string;
  //visualization3D: number[];
  //arcDiagram: string;
}

interface QuadruplexReference {
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
  tetrad2_id: number;
  direction: string;
}



interface CsvData {
  helix_id: string;
  helix_pdbId: string;
  helix_assemblyId: number;
  helix_molecule: string;
  helix_experiment: string
  helix_sequence: string;
  helix_numberOfStrands: number;
  helix_numberOfQuadruplexes: number;
  helix_numberOfTetrads: number;
  helix_tetrads: number[];
  helix_quadruplexes: number[];
}
