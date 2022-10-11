import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cond-seq-cell',
  templateUrl: './cond-seq-cell.component.html',
  styleUrls: ['./cond-seq-cell.component.css']
})
export class CondSeqCellComponent {

  @Input('name') elementName: string;
  @Input() content: string;
  @Input() operator: string;

}
