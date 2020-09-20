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
}

