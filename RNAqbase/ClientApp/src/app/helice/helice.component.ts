import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { CsvModule } from '@ctrl/ngx-csv';

@Component({
  selector: 'app-helice',
  templateUrl: './helice.component.html',
  styleUrls: ['./helice.component.css']
})
export class HeliceComponent implements OnInit {

  selection = new SelectionModel<Helix>(true, []);
  dataSource = new MatTableDataSource<Helix>();
  areButtonsHidden: boolean = true;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns = [
    'id', 'pdbId', 'pdbDeposition', 'assemblyId', 'molecule',
    'sequence', 'numberOfStrands', 'numberOfQudaruplexes', 'numberOfTetrads', 'select'
  ];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.http.get<Helix[]>(this.baseUrl + 'api/Helix/GetHelices').subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      console.log(this.dataSource);
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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Helix): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}


interface Helix {
  id: string;
  pdbId: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  numberOfStrands: string;
  numberOfQudaruplexes: number;
  numberOfTetrads: number;
  pdbDeposition: string;
}
