import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'tetrad-tabel',
  templateUrl: './tetrad-tabel.component.html',
  styleUrls: ['./tetrad-tabel.component.css']
})
export class TetradTabelComponent implements OnInit {
  selection = new SelectionModel<Tetrad>(true, []);
  dataSource = new MatTableDataSource<Tetrad>();
  csvData: Tetrad[] = [];
  areButtonsHidden: boolean = true;
  filteredDataLength = this.dataSource.data.length;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['id', 'quadruplexId', 'pdbId', "pdbDeposition", 'assemblyId', 'molecule',
    'sequence', 'ion','ion_charge', 'onzClass', 'tetradCombination', 'select'];

  constructor(public sanitizer: DomSanitizer, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.http.get<Tetrad[]>(this.baseUrl + 'api/Tetrad/GetTetrads').subscribe(result => {
      this.csvData = JSON.parse(JSON.stringify(result));

      for (let val of this.csvData){
        val.id = 'T' + val.id.toString();
        val.quadruplexId = 'Q' + val.quadruplexId.toString();
      }

      this.dataSource = new MatTableDataSource(result);
      for (let val of result) {
        val.tetrad_id = val.id;
        val.quadruplex_id = val.quadruplexId;
        val.id = 'T' + val.id.toString();
        val.quadruplexId = 'Q' + val.quadruplexId.toString();
      }

      this.dataSource.filterPredicate = (data: Tetrad, filter: string): boolean => {
        const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
          return (currentTerm + (data as { [key: string]: any })[key] + '◬');
        }, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return dataStr.indexOf(transformedFilter) != -1;
      }

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.areButtonsHidden = false;
      this.filteredDataLength = this.dataSource.data.length;

    }, error => console.error(error));

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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Tetrad): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}

interface Tetrad {
  id: any;
  quadruplexId: any;
  pdbId: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  ion: string;
  ion_charge: string;
  onzClass: string;
  pdbDeposition: string;
  select: boolean;
  tetrad_id: number;
  quadruplex_id: number;
  tetradCombination: string;
}
