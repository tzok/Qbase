import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cond-cell',
  templateUrl: './cond-cell.component.html',
  styleUrls: ['./cond-cell.component.css']
})
export class CondCellComponent {
  @Input('name') elementName: string;
  @Input() content: string;
}
