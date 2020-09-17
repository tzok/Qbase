import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import { ArcdiagramComponent } from '../arcdiagram/arcdiagram.component';
import { VisualizationComponent } from '../visualization/visualization.component';

@Component({
  selector: 'app-helix',
  templateUrl: './helix.component.html',
  styleUrls: ['./helix.component.css']
})
export class HelixComponent implements OnInit {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
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
