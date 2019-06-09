import { Component, HostListener, ViewChild } from '@angular/core';
import { MdbTableDirective } from "angular-bootstrap-md";

@Component({
  selector: 'test',
  templateUrl: './test.component.html'
})
export class TestComponent {
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  elements: any = [];
  headElements = ['ID', 'First', 'Last', 'Handle'];

  searchText: string = '';
  previous: string;

  constructor() { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.elements.push({ id: i, first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i });
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
}
