import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})


export class StatisticsComponent implements OnInit {

  topologyBaseTableOne: TopologyBaseTetradViewTableOne[];
  topologyBaseTableTwo: TopologyBaseTetradViewTableTwo[];
  topologyBaseTableThere: TopologyBaseTableThere[];
  ELTetradoableOne: ElTetradoTetradViewTableOne[];
  ELTetradoableTwo: ElTetradoTetradViewTableTwo[];
  ELTetradoableThereA: ElTetradoTetradViewTableThereA[];
  ELTetradoableThereB: ElTetradoTetradViewTableThereB[];
  sub;
  selected = 'topologyBaseTableOne';

  public months: any[];
  public seasons: any[];


  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {}


  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.http.get<TopologyBaseTetradViewTableOne[]>(this.baseUrl + 'api/Statistics/GetTopologyBaseTetradViewTableOne').subscribe(result => {

        let cleanedResult:  TopologyBaseTetradViewTableOne[] = [];
        for (let val of result) {
          cleanedResult.push({
            sequence: val.sequence,
            dna: val.dna,
            rna: val.rna,
            other: val.other,
            total: val.total
          });
        }
        this.topologyBaseTableOne = cleanedResult;


      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.http.get<TopologyBaseTetradViewTableTwo[]>(this.baseUrl + 'api/Statistics/GetTopologyBaseTetradViewTableTwo').subscribe(result => {

        let cleanedResult:  TopologyBaseTetradViewTableTwo[] = [];
        for (let val of result){
          cleanedResult.push({
            numberOfTetrads: val.numberOfTetrads,
            dna: val.dna,
            rna: val.rna,
            other: val.other,
            total: val.total
          });
        }
        this.topologyBaseTableTwo = cleanedResult;

        }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.http.get<TopologyBaseTableThere[]>(this.baseUrl + 'api/Statistics/GetTopologyBaseTetradViewTableThere').subscribe(result => {
        let cleanedResult:  TopologyBaseTableThere[] = [];
        for (let val of result){
          cleanedResult.push({
            chains: val.chains,
            dna: val.dna,
            rna: val.rna,
            other: val.other,
            total: val.total
          });
        }
        this.topologyBaseTableThere = cleanedResult;

      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.http.get<ElTetradoTetradViewTableOne[]>(this.baseUrl + 'api/Statistics/GetElTetradoTetradViewTableOne').subscribe(result => {
        let cleanedResult:  ElTetradoTetradViewTableOne[] = [];
        for (let val of result){
          cleanedResult.push({
            onz: val.onz,
            unimolecular: val.unimolecular,
            bimolecular: val.bimolecular,
            tetramolecular: val.tetramolecular,
            total: val.total
          });
        }
        this.ELTetradoableOne = cleanedResult;

      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.http.get<ElTetradoTetradViewTableTwo[]>(this.baseUrl + 'api/Statistics/GetElTetradoTetradViewTableTwo').subscribe(result => {
        let cleanedResult:  ElTetradoTetradViewTableTwo[] = [];
        for (let val of result){
          cleanedResult.push({
            onzm: val.onzm,
            plus: val.plus,
            minus: val.minus,
            star: val.star,
            total: val.total
          });
        }
        this.ELTetradoableTwo = cleanedResult;

      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.http.get<ElTetradoTetradViewTableThereA[]>(this.baseUrl + 'api/Statistics/GetElTetradoTetradViewTableThereA').subscribe(result => {
        let cleanedResult:  ElTetradoTetradViewTableThereA[] = [];
        for (let val of result){
          cleanedResult.push({
            onzm: val.onzm,
            plus: val.plus,
            minus: val.minus,
            star: val.star,
            total: val.total
          });
        }
        this.ELTetradoableThereA = cleanedResult;

      }, error => console.error(error));
    }, error => console.error(error));

    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.http.get<ElTetradoTetradViewTableThereB[]>(this.baseUrl + 'api/Statistics/GetElTetradoTetradViewTableThereB').subscribe(result => {
        let cleanedResult:  ElTetradoTetradViewTableThereB[] = [];
        for (let val of result){
          cleanedResult.push({
            onzm: val.onzm,
            plus: val.plus,
            minus: val.minus,
            star: val.star,
            total: val.total
          });
        }
        this.ELTetradoableThereB = cleanedResult;
      }, error => console.error(error));
    }, error => console.error(error));


    this.months = [
      { Value: 1, Label: "December" },
      { Value: 1, Label: "January" },
      { Value: 1, Label: "February" },
      { Value: 1, Label: "March" },
      { Value: 1, Label: "April" },
      { Value: 1, Label: "May" },
      { Value: 1, Label: "June" },
      { Value: 1, Label: "July" },
      { Value: 1, Label: "August" },
      { Value: 1, Label: "September" },
      { Value: 1, Label: "October" },
      { Value: 1, Label: "November" }
    ];
    this.seasons = [
      { Value: 4, Label: "Winter" },
      { Value: 4, Label: "Spring" },
      { Value: 4, Label: "Summer" },
      { Value: 4, Label: "Fall" }
    ];
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

interface TopologyBaseTetradViewTableOne{
  sequence: string;
  dna: number;
  rna: number;
  other: number;
  total: number;
}

interface TopologyBaseTetradViewTableTwo{
  numberOfTetrads: string;
  dna: number;
  rna: number;
  other: number;
  total: number;
}

interface TopologyBaseTableThere{
  chains: string;
  dna: number;
  rna: number;
  other: number;
  total: number;
}

interface ElTetradoTetradViewTableOne{
  onz: string;
  unimolecular: number;
  bimolecular: number;
  tetramolecular: number;
  total: number;
}

interface ElTetradoTetradViewTableTwo{
  onzm: string;
  plus: number;
  minus: number;
  star: number;
  total: number;
}

interface ElTetradoTetradViewTableThereA{
  onzm: string;
  plus: number;
  minus: number;
  star: number;
  total: number;
}

interface ElTetradoTetradViewTableThereB{
  onzm: string;
  plus: number;
  minus: number;
  star: number;
  total: number;
}
