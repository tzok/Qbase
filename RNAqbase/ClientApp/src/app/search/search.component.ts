import { Component } from '@angular/core';



export interface TableElements {
  attribute: string;
  conditions: string[];
}

const SEARCH_TABLE_ELEMENTS: TableElements[] = [
  {attribute: 'author name', conditions: ['Kokosza','Matecki','Kremis','Lukasiewicz']},
  {attribute: 'PDB ID', conditions: ['1243','33','2137']}
]


//@Component({
//  selector: 'condition-box',
//  template: '<div class="condition">{{conti}}'
//})

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent {
  displayedColumns: string[] = ['attribute', 'conditions'];
  dataSource = SEARCH_TABLE_ELEMENTS;
  conditions1 = ['Kokosza', 'Matecki', 'Kremis', 'Lukasiewicz'];
}
