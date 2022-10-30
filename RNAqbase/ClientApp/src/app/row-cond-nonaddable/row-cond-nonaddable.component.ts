import { Component, Input, OnInit } from '@angular/core';
import { CondCommPckt } from '../cond-comm-pckt';
import { RowCommPckt } from '../row-comm-pckt';
import { RowElements } from '../row-elements';

@Component({
  selector: 'app-row-cond-nonaddable',
  templateUrl: './row-cond-nonaddable.component.html',
  styleUrls: ['./row-cond-nonaddable.component.css']
})
export class RowCondNonaddableComponent implements OnInit {
  rowData: RowElements;
  @Input() rowName: string;
  @Input() rowType: string;
  @Input() rowElements: RowElements;
  msg = <RowCommPckt>{clickInvoker: '', eventReceiver: ''};

  respondClickEvent(childPckt: CondCommPckt) {
    console.log('parent: ' + this.rowName+ ' ' + childPckt.clickInvoker);
    if (childPckt.clickInvoker == 'any') {
      this.msg = { clickInvoker: childPckt.clickInvoker, eventReceiver: '' , typeOfRow: this.rowType};
    }
    else if (childPckt.clickInvoker != '') {
      if (this.rowType == 'radioSelect') {
        this.msg = { clickInvoker: childPckt.clickInvoker, eventReceiver: '', typeOfRow: this.rowType };
      }
      if ((this.rowType == 'multiSelect')&&(childPckt.clickInvoker != 'any')) {
        this.msg = { clickInvoker: childPckt.clickInvoker, eventReceiver: 'any', typeOfRow: this.rowType };
      }
    }
  }

  ngOnInit() {
    this.rowData = this.rowElements;
  }

}
