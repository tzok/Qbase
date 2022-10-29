import { Component, Input, OnInit } from '@angular/core';
import { RowElements } from '../row-elements';

@Component({
  selector: 'app-row-cond-nonaddable',
  templateUrl: './row-cond-nonaddable.component.html',
  styleUrls: ['./row-cond-nonaddable.component.css']
})
export class RowCondNonaddableComponent implements OnInit {
  rowData: RowElements;
  @Input() rowName: string;
  @Input() rowElements: RowElements;

  ngOnInit() {
    this.rowData = this.rowElements;
  }

}
