import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonEventRs } from '../button-event-rs';
import { RowAttrPckt } from '../row-attr-pckt';
import { TableContent } from '../table-content.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  @Output() triggerReset = new EventEmitter<any>();
  @Output() triggerSearch = new EventEmitter<any>();
  displayedColumns: string[] = ['attribute', 'conditions'];
  addableContent = '+';
  buttonLabelSearch = 'Search';
  buttonLabelReset = 'Reset';
  dataSource = Object.values(TableContent).map((v) => JSON.parse(v));
  httpSearchData: RowAttrPckt[] = [];

  constructor(private http: HttpClient) { }

  rsEvent(pckt: ButtonEventRs) {
    if (pckt.reset) {
      this.triggerReset.emit();
    }
    else if (pckt.search) {
      this.triggerSearch.emit();
    }
  }

  collectRowElements(conds: RowAttrPckt) {
    this.httpSearchData.push(conds);
    if (this.httpSearchData.length === this.dataSource.length) {
      this.getResult();
    }
  }

  getResult() {
    this.http.post('http://localhost:5000/api/Search/PostAndGetResults',
      this.httpSearchData)
      .subscribe(data => console.log(JSON.stringify(data)));
    this.httpSearchData.splice(0);
  }
}
