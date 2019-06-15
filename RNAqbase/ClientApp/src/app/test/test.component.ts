import { Component, ViewChild, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  constructor() {
  }

  ngOnInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
}
