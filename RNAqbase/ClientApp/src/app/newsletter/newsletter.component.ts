import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})

export class NewsletterComponent implements OnInit {
  id: string;
  sub;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog) { }


  ngOnInit(){
  this.sub = this.activatedRoute.paramMap.subscribe(params => {
    this.id = params.get('id');
  });
  }

  unsubscribe(id: string) {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.http.get<string>(this.baseUrl + '' +
        'api/Quadruplex/DeleteEmailFromDatabase?id=' +
        '' + id).subscribe(result => {
      }, error => console.error(error));
    });
  }
}


