import { Component, Input, OnInit } from '@angular/core';
import { RowElements } from '../row-elements';

@Component({
  selector: 'app-row-cond-addable',
  templateUrl: './row-cond-addable.component.html',
  styleUrls: ['./row-cond-addable.component.css']
})

export class RowCondAddableComponent implements OnInit {
  rowData: Array<RowElements>;
  @Input() rowName: string;
  @Input() rowElements: Array<RowElements>;

  ngOnInit() {
    this.rowData = this.rowElements;
  }

}
