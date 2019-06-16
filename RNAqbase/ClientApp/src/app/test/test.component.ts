import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

declare var $;

@Component({
  selector: 'test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  @ViewChild('dataTable') table;
  public tetrads: Tetrad[];
  public dataTable: any;
  public headers = ['ID', 'Quadruplex ID', 'PDB ID', 'Assembly ID', 'Molecule',
    'Sequence', 'ONZ Class', 'Select'];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.http.get<Tetrad[]>(this.baseUrl + 'api/TetradReference/GetTetrads').subscribe(result => {
      this.tetrads = result;
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable();
    }, error => console.error(error));
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
