import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
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
  isClicked: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['eventReceiver']) {
      this.eventRecv(this.eventReceiver);
    }
  }

  ngOnInit() {
    this.isClicked = false;
    if (this.content == 'any') {
      this.clickEvent();
    }
  }

  eventRecv(pckt: RowCommPckt) {
    if (pckt.clickInvoker != '') {
      if (pckt.clickInvoker == 'row') {
        if (pckt.eventReceiver == this.content) {
          this.isClicked = true;
        }
      }
      else {
        if ((pckt.eventReceiver == 'any') && (this.content == 'any')) {
          this.isClicked = false;
        }
        else if ((pckt.clickInvoker == 'any') && (this.content != 'any')) {
          this.isClicked = false;
        }
        else if ((pckt.clickInvoker != this.content) && (pckt.typeOfRow == 'radioSelect')) {
          this.isClicked = false;
        }
      }
    }
  }

  clickEvent() {
    if (this.isClicked)
    {
      this.isClicked = false;
      const pckt = <CondCommPckt>{clickInvoker: this.content, clicked: false};
      this.clicked.emit(pckt);
    }
    else
    {
      this.isClicked = true;
      const pckt = <CondCommPckt> {clickInvoker: this.content, clicked: true};
      this.clicked.emit(pckt);
    }
  }
}
