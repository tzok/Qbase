import { Component, Input, OnInit } from '@angular/core';
import { CondCommPckt } from '../cond-comm-pckt';
import { ElementsFocus } from '../elements-focus';
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
  msg = <RowCommPckt>{ clickInvoker: '', eventReceiver: '' };
  rowElementsStatus: ElementsFocus = {};

  respondClickEvent(childPckt: CondCommPckt) {
    if (childPckt.clicked) {
      if (childPckt.clickInvoker == 'any') {
        this.rowElementsStatus[childPckt.clickInvoker] = childPckt.clicked;
        this.unclickAll(childPckt.clickInvoker);
        this.msg = { clickInvoker: childPckt.clickInvoker, eventReceiver: '', typeOfRow: this.rowType };
      }
      else if (childPckt.clickInvoker != '') {
        if (this.rowType == 'radioSelect') {
          this.rowElementsStatus[childPckt.clickInvoker] = childPckt.clicked;
          this.unclickAll(childPckt.clickInvoker);
          this.msg = { clickInvoker: childPckt.clickInvoker, eventReceiver: '', typeOfRow: this.rowType };
        }
        if ((this.rowType == 'multiSelect') && (childPckt.clickInvoker != 'any')) {
          this.rowElementsStatus[childPckt.clickInvoker] = childPckt.clicked;
          this.rowElementsStatus['any'] = false;
          this.msg = { clickInvoker: childPckt.clickInvoker, eventReceiver: 'any', typeOfRow: this.rowType };
        }
      }
    }
    else {
      this.rowElementsStatus[childPckt.clickInvoker] = childPckt.clicked;
      if (!this.checkIfAnyClicked()) {
        this.msg = { clickInvoker: 'row', eventReceiver: 'any', typeOfRow: this.rowType };
        this.rowElementsStatus['any'] = true;
      }
    }
    console.log(this.rowElementsStatus);
  }

  ngOnInit() {
    this.rowData = this.rowElements;
    for (let i of this.rowData.conditions) {
        this.rowElementsStatus[i.condition] = false;
    }
  }

  checkIfAnyClicked() {
    let i = false;
    for (let key in this.rowElementsStatus) {
        i = i || this.rowElementsStatus[key];
    }
    return i;
  }

  unclickAll(elem: string) {
    for (let key in this.rowElementsStatus) {
      if (key != elem) {
        this.rowElementsStatus[key] = false;
      }
    }
  }

}
