import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { CsvModule } from '@ctrl/ngx-csv';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'tetrad-tabel',
  templateUrl: './tetrad-tabel.component.html',
  styleUrls: ['./tetrad-tabel.component.css']
})
export class TetradTabelComponent implements OnInit {

  selection = new SelectionModel<Tetrad>(true, []);
  dataSource = new MatTableDataSource<Tetrad>();
  image: Visualization3D;
  imageData: any;
  sanitizedImageData: any;

  areButtonsHidden: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['id', 'quadruplexId', 'pdbIdentifier', "pdbDeposition", 'assemblyId', 'ndbId', 'molecule',
    'sequence', 'onzClass', 'select'];

  constructor(public sanitizer: DomSanitizer, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.http.get<Tetrad[]>(this.baseUrl + 'api/Tetrad/GetTetrads').subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.areButtonsHidden = false;
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

  arrayBufferToBase64 = function( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

   getVisualization(tetradID: number)
  {
      this.http.get<Visualization3D>(this.baseUrl + 'api/Tetrad/GetVisualization3DForTetrad?id=' + tetradID).subscribe(result => {

        this.image = result;
        console.log("TUTAJ: ");
        this.imageData = 'data:image/jpeg;base64,' + this.hexToBase64(this.image.visualization3d);
        console.log("imagedata: " + this.imageData)
        console.log(this.image)

        this.sanitizedImageData =  this.sanitizer.bypassSecurityTrustUrl(this.imageData);
        console.log("tu2" + this.sanitizedImageData);
        return this.sanitizedImageData;
    })

  }

   hexToBase64(str: any) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
  }

}

interface Visualization3D {
  visualization3d: string;
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
}
