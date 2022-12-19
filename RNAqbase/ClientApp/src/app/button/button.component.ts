import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string;
  
  constructor(private http: HttpClient) { }
  clickEvent() {
    if (this.label === 'Search') {
      this.getResults();
    }
  }
    getResults() {
      this.http.post('http://localhost:5000/api/Search/PostAndGetResults',
        `[
        {"Attribute": "Loop Length", "Conditions": [{ "Value": "1", "Operator": ">=" }, { "Value": "6", "Operator": "<=" }]},
        {"Attribute": "Experimental Method", "Conditions": [{ "Value": "X-Ray", "Operator": "" }]},
        {"Attribute": "ONZ class", "Conditions": [{ "Value": "N-", "Operator": "" }, { "Value": "Z-", "Operator": "" }]},
        {"Attribute": "PDB ID", "Conditions": [{ "Value": "10", "Operator": "" }]},
        {"Attribute": "Number of tetrads", "Conditions": [{ "Value": "1", "Operator": ">" }]},
        {"Attribute": "Type (by no. of strands)", "Conditions": [{ "Value": "tetramolecular", "Operator": "" }]},
        {"Attribute": "Bulges", "Conditions": [{ "Value": "with bulges", "Operator": "" }]}
        ]`)
        .subscribe(data => console.log(JSON.stringify(data)));
  }
}
