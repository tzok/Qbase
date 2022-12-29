import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonEventRs } from '../button-event-rs';
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
  searchEvent: boolean;

  ngOnInit() {
    this.searchEvent = false;
  }

  rsEvent(pckt: ButtonEventRs) {
    if (pckt.reset) {
      this.triggerReset.emit();
    }
    else if (pckt.search) {
      this.searchEvent = true;
    }
  }
}
