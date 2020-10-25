import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import {Visualization3DComponent} from "../visualization3-d/visualization3-d.component";

@Component({
  selector: 'structure-table',
  templateUrl: './structure-table.component.html',
  styleUrls: ['./structure-table.component.css']
})
export class StructureTableComponent implements OnInit {
  selection = new SelectionModel<Structure>(true, []);

  dataSource = new MatTableDataSource<Structure>();

  areButtonsHidden: boolean = true;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns = [
    'pdbIdentifier', 'pdbDeposition', 'assemblyId', 'molecule',
    'experimentalMethod', 'structure2D','structure3D', 'quadruplexId', 'numberOfStrands', 'onzClass', 'select'
  ];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private dialog: MatDialog) { }

  ngOnInit() {
    this.http.get<Structure[]>(this.baseUrl + 'api/Quadruplex/GetQuadruplexes').subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.areButtonsHidden = false;
    },
      error => console.error(error));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Structure): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  showStructure(pdbId: string) {
    this.http.get(this.baseUrl + 'api/pdb/GetVisualizationById?pdbid=' + pdbId,
      { responseType: 'text' })
      .subscribe(result => {
        console.log(result);
      let dialogRef = this.dialog.open(VisualizationDialogComponent, {
          data: { svg: result },
        });
    },
      error => console.error(error));
  }

  show3DStructure(pdbId: number, id: number) {
    let dialogRef = this.dialog.open(Visualization3DComponent, {
      data: {
        pdbId: pdbId,
        url: this.baseUrl + 'api/Quadruplex/GetQuadruplex3dVisualizationMethod?id=' + id

      }
    });
  }


}

interface Structure {
  pdbId: number;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
  id: number;
  numberOfStrands: number;
  onzmClass: string;
  pdbDeposition: string;
  select: boolean;
}
