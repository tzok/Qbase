import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {VisualizationDialogComponent} from '../visualization-dialog/visualization-dialog.component';
import {Visualization3DComponent} from "../visualization3-d/visualization3-d.component";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'structure-table',
  templateUrl: './structure-table.component.html',
  styleUrls: ['./structure-table.component.css']
})
export class StructureTableComponent implements OnInit {
  selection = new SelectionModel<Structure>(true, []);
  dataSource = new MatTableDataSource<Structure>();
  csvData: Structure[] = [];
  areButtonsHidden: boolean = true;
  filteredDataLength = this.dataSource.data.length;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns = [
    'pdbIdentifier', 'pdbDeposition', 'assemblyId', 'molecule',
    'experimentalMethod', 'quadruplexId', 'structure2D', 'structure3D', 'select'
  ];
  columnNames = [
    'PDB ID', 'PDB Deposition', 'Assembly ID', 'Molecule', 'Experimental method', 'Quadruplex ID'
  ];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.http.get<Structure[]>(this.baseUrl + 'api/Quadruplex/GetStructures').subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        for (let val of result) {
          val.quadruplex_id = Array.from(new Set(val.quadruplex_id.split(',')))
        }

        this.csvData = JSON.parse(JSON.stringify(result));
        for (let val of this.csvData) {
          for (let i = 0; i < val.quadruplex_id.length; i++) {
            val.quadruplex_id[i] = 'Q' + val.quadruplex_id[i];
          }
        }

        for (let val of result) {
          val.quadruplex_idetifier = JSON.parse(JSON.stringify(val.quadruplex_id));
          for (let i = 0; i < val.quadruplex_id.length; i++) {
            val.quadruplex_idetifier[i] = 'Q' + val.quadruplex_id[i];
          }
        }

        this.dataSource.filterPredicate = (data: Structure, filter: string) => !filter || (data.pdbId != null && data.pdbId.toString().toUpperCase().includes(filter.toUpperCase()));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.areButtonsHidden = false;
        this.filteredDataLength = this.dataSource.data.length;
      },
      error => console.error(error));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredDataLength = this.dataSource.filteredData.length;
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pdbId + 1}`;
  }

  showStructure(type: any, id: any) {
    let dialogRef = this.dialog.open(VisualizationDialogComponent, {
      data: {type: type, id: id},
    });
  }

  show3DStructure(pdbId: number, assembly: number) {
    let dialogRef = this.dialog.open(Visualization3DComponent, {
      data: {
        pdbId: pdbId,
        url: this.baseUrl + 'api/pdb/GetVisualization3dById?pdbid=' + pdbId + '&assembly=' + assembly
      }
    });
  }

  changeFilterPredicate($event: MatSelectChange) {
    switch ($event.value) {
      case 'pdbIdentifier':
        this.dataSource.filterPredicate = (data: Structure, filter: string) => !filter || (data.pdbId != null && data.pdbId.toString().toUpperCase().includes(filter.toUpperCase()));
        break;
      case 'pdbDeposition':
        this.dataSource.filterPredicate = (data: Structure, filter: string) => !filter || (data.pdbDeposition != null && data.pdbDeposition.toString().toUpperCase().includes(filter.toUpperCase()));
        break;
      case 'assemblyId':
        this.dataSource.filterPredicate = (data: Structure, filter: string) => !filter || (data.assemblyId != null && data.assemblyId.toString().toUpperCase().includes(filter.toUpperCase()));
        break;
      case 'molecule':
        this.dataSource.filterPredicate = (data: Structure, filter: string) => !filter || (data.molecule != null && data.molecule.toString().toUpperCase().includes(filter.toUpperCase()));
        break;
      case 'experimentalMethod':
        this.dataSource.filterPredicate = (data: Structure, filter: string) => !filter || (data.experiment != null && data.experiment.toString().toUpperCase().includes(filter.toUpperCase()));
        break;
      case 'quadruplexId':
        this.dataSource.filterPredicate = (data: Structure, filter: string) => !filter || (data.quadruplex_idetifier != null && data.quadruplex_idetifier.toString().toUpperCase().includes(filter.toUpperCase()));
        break;
    }

    this.dataSource.filter = this.dataSource.filter.trim().toLowerCase();
    this.filteredDataLength = this.dataSource.filteredData.length;
  }
}

interface Structure {
  quadruplex_id: any;
  quadruplex_idetifier: any;
  pdbId: string;
  pdbDeposition: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
}

