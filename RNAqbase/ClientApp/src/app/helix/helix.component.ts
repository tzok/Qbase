import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
import { Visualization3DComponent } from '../visualization3-d/visualization3-d.component';
import { ArcdiagramComponent } from '../arcdiagram/arcdiagram.component';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import { VisualizationComponent } from '../visualization/visualization.component';

import * as XLSX from 'C:/Users/natkr/AppData/Roaming/npm/node_modules/xlsx';


@Component({
  selector: 'app-helix',
  templateUrl: './helix.component.html',
  styleUrls: ['./helix.component.css']
})
export class HelixComponent implements OnInit {

  data: Helix;
  tetrads: TetradReference[];
  quadruplexes: QuadruplexReference[];
  helixId: number;
  sub;
  csvData: CsvData = <CsvData>{};
  csvDataTable: CsvData[];
  dataSource = new MatTableDataSource<CsvData>();


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

      this.http.get<Helix>(this.baseUrl + 'api/Helix/GetHelixById?id=' + this.helixId).subscribe(result => {
        this.data = result;

        /*this.csvData.helix_id = this.data.id;
        this.csvData.helix_molecule = this.data.molecule;
        this.csvData.helix_experiment = this.data.experiment;
        this.csvData.helix_numberOfStrands = this.data.numberOfStrands;
        this.csvData.helix_numberOfQuadruplexes = this.data.numberOfQuadruplexes;
        this.csvData.helix_numberOfTetrads = this.data.numberOfTetrads;
        this.csvDataTable.push(this.csvData);

        this.dataSource = new MatTableDataSource(this.csvDataTable);
        */

        
        this.http.get<TetradReference[]>(this.baseUrl + '' + 'api/Tetrad/GetListOfTetrads?id=' + '' + this.helixId).subscribe(result => {
          this.tetrads = result;
          //this.dataSource = new MatTableDataSource(result);
          }, error => console.error(error));

        this.http.get<QuadruplexReference[]>(this.baseUrl + '' + 'api/Quadruplex/GetListOfQuadruplex?id=' + '' + this.helixId).subscribe(result => {
          this.quadruplexes = result;
          this.data.numberOfQuadruplexes = this.quadruplexes.length;
          }, error => console.error(error));


      }, error => console.error(error));

    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "x");

  }

}

interface Helix {
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
