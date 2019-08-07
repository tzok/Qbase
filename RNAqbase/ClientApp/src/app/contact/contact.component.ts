import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string;
  email: string;
  message: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, ) {

  }
  sendMessage() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(this.baseUrl + 'api/MailSender/SendEmail', {
      subject: 'Message from ' + this.email,
      message: 'Author: ' + this.name + ' ' + this.message
    }, httpOptions)
      .subscribe(result => {
        alert("Your message has been sent. Thank you!");
        this.name = null;
        this.email = null;
        this.message = null;
      }, error => console.error(error));
  }
}
