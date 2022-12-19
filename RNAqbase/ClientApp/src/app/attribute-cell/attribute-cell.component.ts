import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attribute-cell',
  templateUrl: './attribute-cell.component.html',
  styleUrls: ['./attribute-cell.component.css']
})
export class AttributeCellComponent {
  @Input('ID') elementID: string;
  @Input() attrType: string;
  @Input() content: string;
}
