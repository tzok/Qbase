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
    if (this.label = 'Search') {
      this.getResults();
    }
  }
    getResults() {
      this.http.post('http://localhost:5000/api/Search/PostAndGetResults',
        `[
        {"Attribute": "Sequence Of Tetrads", "Conditions": [{ "Value": "CGTA", "Operator": "" }, { "Value": "AA", "Operator": "" }]},
        ]`)
        .subscribe(data => console.log(JSON.stringify(data)));
  }
}
