import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cond-clickable-cell',
  templateUrl: './cond-clickable-cell.component.html',
  styleUrls: ['./cond-clickable-cell.component.css']
})
export class CondClickableCellComponent {
  @Input('name') elementName: string;
  @Input() content: string;
  @Output() clicked = new EventEmitter<boolean>();
  isClicked = false;

  clickEvent() {
    if (this.isClicked)
    {
      this.isClicked = false;
      this.clicked.emit(false);
    }
    else
    {
      this.isClicked = true;
      this.clicked.emit(true);
    }
  }
}
