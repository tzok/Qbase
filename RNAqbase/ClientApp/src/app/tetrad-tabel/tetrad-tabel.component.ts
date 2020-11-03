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
  visulization: Visualization3D[] = [];
  areButtonsHidden: boolean = true;

  mapImage: any;

@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['id', 'quadruplexId', 'pdbIdentifier', "pdbDeposition", 'assemblyId', 'molecule',
    'sequence', 'onzClass', 'select'];

  constructor(public sanitizer: DomSanitizer, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private dialog: MatDialog) { }

  ngOnInit() {
    this.http.get<Tetrad[]>(this.baseUrl + 'api/Tetrad/GetTetrads').subscribe(result => {

      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.areButtonsHidden = false;

      this.http.get<Visualization3D[]>(this.baseUrl + 'api/Tetrad/GetAllVisualization3DFromTetrad').subscribe(result => {
        this.visulization = result;
        this.mapImage = Object.assign({}, ...this.visulization.map(s => ({[s.id]: s.visualization3d})));

      }, error => console.error(error));
      }, error => console.error(error));
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

  checkboxLabel(row?: Tetrad): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  get3dStructure(tetradID:string) {
      return 'data:image/png;base64,' + this.mapImage[tetradID];
  }
}

interface Visualization3D {
  visualization3d: string;
  id: string;
}

interface Tetrad {
  id: number;
  quadruplexId: string;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  onzClass: string;
  pdbDeposition: string;
  select: boolean;
  //visualization: string;
}
