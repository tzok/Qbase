import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonEventRs } from '../button-event-rs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string;
  @Output() buttonClickedEvent = new EventEmitter<ButtonEventRs>();

  constructor(private http: HttpClient) { }
  clickEvent() {
    if (this.label === 'Search') {
      this.buttonClickedEvent.emit({ search: true, reset: false });
    }
    else if (this.label === 'Reset') {
      this.buttonClickedEvent.emit({ search: false, reset: true });
    }
  }
}
