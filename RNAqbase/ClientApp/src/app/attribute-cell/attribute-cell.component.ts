import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attribute-cell',
  templateUrl: './attribute-cell.component.html',
  styleUrls: ['./attribute-cell.component.css']
})
export class AttributeCellComponent {
  @Input('name') elementName: string;
  @Input() content: string;
}
