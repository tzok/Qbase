import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  model: any = {};

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, ) {}

  reset() {
    this.model = {};
  }

  onSubmit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(this.baseUrl + 'api/MailSender/SendEmail', {
      subject: 'Message from ' + this.model.email,
      message: this.model.message
    }, httpOptions)
      .subscribe(result => {
        alert("Your message has been sent. Thank you!");
        this.model = {};
      }, error => console.error(error));
  }
}
