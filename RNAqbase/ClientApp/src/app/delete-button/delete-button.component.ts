import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {
  @Output() buttonClickEvent = new EventEmitter<boolean>();


  clickedEvent() {
    this.buttonClickEvent.emit(true);
  }
  constructor() { }

  ngOnInit() {
  }

}
