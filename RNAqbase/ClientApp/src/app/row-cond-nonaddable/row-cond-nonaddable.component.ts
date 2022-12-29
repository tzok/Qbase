import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
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
  @Input() rowAttrID: string;
  @Input() rowAttrName: string;
  @Input() rowType: string;
  @Input() rowElements: RowElements;
  @Input() resetEvent: EventEmitter<any>;

  msg = <RowCommPckt>{ clickInvoker: '', eventReceiver: '' };
  rowElementsStatus: ElementsFocus = {};

  respondClickEvent(childPckt: CondCommPckt) {
    this.clickEventLogic(childPckt);
  }

  ngOnInit() {
    this.resetEvent.subscribe(() => {
      this.handleResetReq();
    });
    this.rowData = this.rowElements;
    for (let i of this.rowData.conditions) {
      this.rowElementsStatus[i.condition] = false;
    }
  }

  private clickEventLogic(childPckt: CondCommPckt) {
    if (childPckt.clicked) {
      if (childPckt.clickInvoker == 'any') {
        this.setValues(childPckt);
        this.msg = { clickInvoker: childPckt.clickInvoker, eventReceiver: '', typeOfRow: this.rowType };
      }
      else if (childPckt.clickInvoker != '') {
        if (this.rowType == 'radioSelect') {
          this.setValues(childPckt);
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
  }

  private setValues(childPckt: CondCommPckt) {
    this.rowElementsStatus[childPckt.clickInvoker] = childPckt.clicked;
    this.unclickAll(childPckt.clickInvoker);
  }

  checkIfAnyClicked(): boolean {
    let i = false;
    for (let key in this.rowElementsStatus) {
      i = i || this.rowElementsStatus[key];
    }
    return i;
  }

  unclickAll(elem: string): void {
    for (let key in this.rowElementsStatus) {
      if (key != elem) {
        this.rowElementsStatus[key] = false;
      }
    }
  }

  handleResetReq() {
    this.rowElementsStatus['any'] = true;
    this.unclickAll('any');
    this.msg = { clickInvoker: 'row', eventReceiver: 'any', typeOfRow: this.rowType };
  }
}
