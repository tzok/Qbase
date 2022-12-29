import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonEventRs } from '../button-event-rs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string;
  @Output() buttonClickedEvent = new EventEmitter<ButtonEventRs>();

  constructor(private http: HttpClient) { }
  clickEvent() {
    if (this.label === 'Search') {
      this.getResults();
    }
    else if (this.label === 'Reset') {
      this.buttonClickedEvent.emit({ search: false, reset: true });
    }
  }
    getResults() {
      this.http.post('http://localhost:5000/api/Search/PostAndGetResults',
        `[
        {"attrID": "loopLen", "conditions": [{ "value": "1", "operator": ">=" }, { "value": "6", "operator": "<=" }]},
        {"attrID": "expMethod", "conditions": [{ "value": "X-Ray", "operator": "" }]},
        {"attrID": "onzClass", "conditions": [{ "value": "N-", "operator": "" }, { "value": "Z-", "operator": "" }]},
        {"attrID": "pdbID", "conditions": [{ "value": "10", "operator": "" }]},
        {"attrID": "noOfTetrads", "conditions": [{ "value": "1", "operator": ">=" }]},
        {"attrID": "typeNoStrands", "conditions": [{ "value": "tetramolecular", "operator": "" }]},
        {"attrID": "bulges", "conditions": [{ "value": "with bulges", "operator": "" }]}
        ]`)
      .subscribe(data => console.log(JSON.stringify(data)));
  }
}
