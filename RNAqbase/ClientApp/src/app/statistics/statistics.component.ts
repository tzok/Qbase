import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})


export class StatisticsComponent implements OnInit {

  topologyBaseTableOne: Table[];
  topologyBaseTableTwo: Table[];
  topologyBaseTableThere: Table[];
  ELTetradoableOne: Table[];
  ELTetradoableTwo: Table[];
  ELTetradoableThereA: Table[];
  ELTetradoableThereB: Table[];
  sub;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {

  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.http.get<Table[]>(this.baseUrl + 'api/Statistics/GetTopologyBaseTetradViewTableOne').subscribe(result => {
        this.topologyBaseTableOne = result;
      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.http.get<Table[]>(this.baseUrl + 'api/Statistics/GetTopologyBaseTetradViewTableTwo').subscribe(result => {
        this.topologyBaseTableTwo = result;
      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.http.get<Table[]>(this.baseUrl + 'api/Statistics/GetTopologyBaseTetradViewTableThere').subscribe(result => {
        this.topologyBaseTableThere = result;
      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.http.get<Table[]>(this.baseUrl + 'api/Statistics/GetElTetradoTetradViewTableOne').subscribe(result => {
        this.ELTetradoableOne = result;
      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.http.get<Table[]>(this.baseUrl + 'api/Statistics/GetElTetradoTetradViewTableTwo').subscribe(result => {
        this.ELTetradoableTwo = result;
      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.http.get<Table[]>(this.baseUrl + 'api/Statistics/GetElTetradoTetradViewTableThereA').subscribe(result => {
        this.ELTetradoableThereA = result;
      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.http.get<Table[]>(this.baseUrl + 'api/Statistics/GetElTetradoTetradViewTableThereB').subscribe(result => {
        this.ELTetradoableThereB = result;
      }, error => console.error(error));
    }, error => console.error(error));
  }

}

interface Table{
  sequence: string;
  dna: number;
  rna: number;
  other: number;
  total: number;
  numberOfTetrads: string;
  onz: string;
  unimolecular: number;
  bimolecular: number;
  tetramolecular: number;
  onzm: string;
  plus: number;
  minus: number;
  star: number;
  chains: string;
}
