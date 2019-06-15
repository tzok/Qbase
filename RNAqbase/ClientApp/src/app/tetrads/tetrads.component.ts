import { Component, Inject, HostListener, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdbTablePaginationComponent, MdbTableDirective } from "angular-bootstrap-md";

@Component({
  selector: 'app-tetrads',
  templateUrl: './tetrads.component.html'
})
export class TetradsComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  public tetrads: Tetrad[];
  public headers = ['ID', 'Quadruplex ID', 'PDB ID', 'Assembly ID', 'Molecule',
  'Sequence', 'ONZ Class', 'Select'];

  public searchText: string = '';
  public previous: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private cdRef: ChangeDetectorRef) { }

   ngOnInit() {
    this.http.get<Tetrad[]>(this.baseUrl + 'api/TetradReference/GetTetrads').subscribe(result => {
      this.tetrads = result;
      this.mdbTable.setDataSource(result);
      this.tetrads = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }, error => console.error(error));
  }

  @HostListener('input') oninput() {
    this.searchItems();
 }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.tetrads = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.tetrads = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
}

class Tetrad {
  id: number;
  quadruplexId: number;
  pdbId: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  onz: string;
  select: boolean;
}
