import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cond-operator-cell',
  templateUrl: './cond-operator-cell.component.html',
  styleUrls: ['./cond-operator-cell.component.css']
})
export class CondOperatorCellComponent {
  @Input('name') elementName: string;
  @Input() content: string;
  @Input() operator: string;
}
