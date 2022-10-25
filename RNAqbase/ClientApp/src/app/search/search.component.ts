import { Component } from '@angular/core';
import { TableContent } from '../table-content.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  displayedColumns: string[] = ['attribute', 'conditions'];
  addableContent = '+';
  buttonLabelSearch = 'Search';
  buttonLabelReset = 'Reset';
  dataSource = Object.values(TableContent).map(v => JSON.parse(v));
}
