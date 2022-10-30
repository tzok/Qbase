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
   // console.log(this.content);
    //console.log(this.eventReceiver);
    if (changes['eventReceiver']) {
      this.eventRecv(this.eventReceiver);
      console.log("condname: " + this.content);
      console.log("change in " + this.attributeName);
      console.log(this.eventReceiver);
    }
  }

  ngOnInit() {
    this.isClicked = false;
    if (this.content == 'any') {
      console.log("INIT")
      this.clickEvent();
    }
  }

  eventRecv(pckt: RowCommPckt) {
      //radio buttons situation, clicking other than any unClick any
    if (pckt.clickInvoker != '') {
      if ((pckt.eventReceiver == 'any') && (this.content == 'any')) {
        this.isClicked = false;
      }
      //clicking 'any' behaves as radio button (unClick all buttons in row)
      else if ((pckt.clickInvoker == 'any') && (this.content != 'any')) {
        this.isClicked = false;
      }
      //radio buttons 
      else if ((pckt.clickInvoker != this.content)&&(pckt.typeOfRow == 'radioSelect')) {
        this.isClicked = false;
        //change to invoking clickEvent() so that row will update its clicked cond table
      }
    }
  }

  clickEvent() {
    if (this.isClicked)
    {
      console.log("CLICKED: " + this.content);
      //var pckt: CondCommPckt;
      //pckt.clickInvoker = this.elementName;
      this.isClicked = false;
      //this.clicked.emit(pckt);
    }
    else
    {
      console.log('childe clicked');
      const pckt = <CondCommPckt> {clickInvoker: this.content, clicked: true};
      //add clicked
      console.log(pckt);
      this.clicked.emit(pckt);
      this.isClicked = true;
    }
  }
}
