import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cond-clickable-cell',
  templateUrl: './cond-clickable-cell.component.html',
  styleUrls: ['./cond-clickable-cell.component.css']
})
export class CondClickableCellComponent {
  @Input('name') elementName: string;
  @Input() content: string;
}
