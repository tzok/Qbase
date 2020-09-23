import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Visualization3DComponent } from '../visualization3-d/visualization3-d.component';
import { ArcdiagramComponent } from '../arcdiagram/arcdiagram.component';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import { VisualizationComponent } from '../visualization/visualization.component';


@Component({
  selector: 'app-helix',
  templateUrl: './helix.component.html',
  styleUrls: ['./helix.component.css']
})
export class HelixComponent implements OnInit {

  data: Helix;
  csvData: Helix[];
  tetrads: TetradReference[];
  quadruplexes: QuadruplexReference[];
  helixId: number;
  sub;
  

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

        this.http.get<TetradReference[]>(this.baseUrl + '' + 'api/Tetrad/GetListOfTetrads?id=' + '' + this.helixId).subscribe(result => {
          this.tetrads = result;
          }, error => console.error(error));

        this.http.get<QuadruplexReference[]>(this.baseUrl + '' + 'api/Quadruplex/GetListOfQuadruplex?id=' + '' + this.helixId).subscribe(result => {
          this.quadruplexes = result;
          this.data.numberOfQuadruplexes = this.quadruplexes.length;
          }, error => console.error(error));

        this.csvData = [this.data];
      }, error => console.error(error));

    });
  }
 
  ngOnDestroy() {
    this.sub.unsubscribe();
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
}
