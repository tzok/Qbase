import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
      getResults();
    }
  }
}

function getResults() {
  this.http.get('http://localhost:5000/api/Search/GetResults')
      .subscribe(data => console.log(data));
}
