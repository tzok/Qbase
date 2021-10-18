import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {CsvModule} from '@ctrl/ngx-csv';

@Component({
  selector: 'quadruplex-table',
  templateUrl: './quadruplex-table.component.html',
  styleUrls: ['./quadruplex-table.component.css']
})
export class QuadruplexTableComponent implements OnInit {

  selection = new SelectionModel<Quadruplex>(true, []);
  dataSource = new MatTableDataSource<Quadruplex>();
  csvData: Quadruplex[] = [];
  areButtonsHidden: boolean = true;
  filteredDataLength = this.dataSource.data.length;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns = [
    'id', 'pdbId', 'pdbDeposition', 'assemblyId', 'molecule', 'experiment',
    'sequence', 'ion', 'ion_charge', 'type_strand', 'type_onzm', 'onzmClass', 'numberOfTetrads', 'loopTopology', 'tetradCombination', 'select'
  ];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.http.get<Quadruplex[]>(this.baseUrl + 'api/Quadruplex/GetQuadruplexes').subscribe(result => {
        this.csvData = JSON.parse(JSON.stringify(result));
        for (let val of this.csvData) {
          val.id = 'Q' + val.id;
        }
        this.dataSource = new MatTableDataSource(result);
        for (let val of result) {
          val.quadruplex_id = 'Q' + val.id;
        }
        this.dataSource.filterPredicate = (data: Quadruplex, filter: string): boolean => {
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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Quadruplex): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  truncate(source) {
    let size = 30;
    let result = source.slice(0, 4);
    for (let i = 4; i < source.length; i += 4) {
      result += ',' + source.slice(i, i + 4);
    }
    return result.length > size ? result.slice(0, size - 1) + "…" : result;
  }
}

interface Quadruplex {
  id: string;
  quadruplex_id: any;
  loopTopology: string;
  ion: string;
  ion_charge: string;
  tetradCombination: string;
  pdbId: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
  sequence: string;
  typeOfStrands: string;
  type: string;
  onzmClass: string;
  numberOfTetrads: string;
  pdbDeposition: string;
}
