import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CondCommPckt } from '../cond-comm-pckt';
import { RowCommPckt } from '../row-comm-pckt';

@Component({
  selector: 'app-cond-clickable-cell',
  templateUrl: './cond-clickable-cell.component.html',
  styleUrls: ['./cond-clickable-cell.component.css']
})
export class CondClickableCellComponent {
  @Input('name') attributeName: string;
  @Input() content: string;
  @Input() eventReceiver: RowCommPckt;
  @Output() clicked = new EventEmitter<CondCommPckt>();
  isClicked = false;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['eventReceiver']) {
      //this.eventRecv(this.eventReceiver);
    }
  }

  eventRecv(pckt: RowCommPckt) {
      //radio buttons situation, clicking other than any unClick any
    if ((pckt.eventReceiver == 'any') && (this.content == 'any'))
    {
      this.isClicked = false;
    }
      //clicking 'any' behaves as radio button (unClick all buttons in row)
    else if (pckt.clickInvoker == 'any') {
      this.isClicked = false;
    }
      //radio buttons 
      else if (pckt.clickInvoker != this.content) { 
      this.isClicked = false;
    }
  }

  clickEvent() {
    if (this.isClicked)
    {
      //var pckt: CondCommPckt;
      //pckt.clickInvoker = this.elementName;
      this.isClicked = false;
      //this.clicked.emit(pckt);
    }
    else
    {
      const pckt = <CondCommPckt> {clickInvoker: this.content, clicked: true};
      //add clicked
      this.clicked.emit(pckt);
      this.isClicked = true;
    }
  }
}
