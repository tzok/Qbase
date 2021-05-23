import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ChartDataSets} from "chart.js";
import {Color} from "ng2-charts";
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

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


  public pieChartLabels_tableOne_type:string[] = ["DNA", "RNA", "Other"];
  public pieChartLabels_tableOne_sequence:string[] = [];


  public pieChartData_tableOne_type:number[] = [];
  public pieChartData_tableOne_sequence:number[] = [];
  public pieChartData_tableOne_sequence_dna:number[] = [];
  public pieChartData_tableOne_sequence_rna:number[] = [];
  public pieChartData_tableOne_sequence_other:number[] = []; public barChartOptions: any = {
    responsive: true,
  };
  public barChartLabels: string[] =[];

  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  public barChartColors: Color[] = [
    {backgroundColor: "#45A29E"},
    {backgroundColor: "#57dbd5"},
  ]

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';


  public pieChartType:any = 'pie';
  public pieChartOptions:any = {
    responsive: true,
    legend: { position: "right" },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return  ctx.chart.data.labels[ctx.dataIndex];
        },
      },
    },
  }

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }


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

        this.pieChartData_tableOne_type = [cleanedResult.slice(-1)[0].dna, cleanedResult.slice(-1)[0].rna, cleanedResult.slice(-1)[0].other];

        let dna = result.map(x => x.dna)
        dna.pop();
        this.pieChartData_tableOne_sequence_dna = dna;
        let rna = result.map(x => x.rna);
        rna.pop()
        this.pieChartData_tableOne_sequence_rna = rna;
        let other = result.map(x => x.other);
        other.pop();
        this.pieChartData_tableOne_sequence_other = other;
        let total = result.map(x => x.total);
        total.pop();
        this.pieChartData_tableOne_sequence = total;

        let label = result.map(x => x.sequence)
        label.pop()
        this.pieChartLabels_tableOne_sequence = label;
        this.barChartLabels = label;

        this.barChartData.push({data: dna, label: 'DNA', stack:'a'})
        this.barChartData.push({data: rna, label: 'RNA', stack:'a'})
        this.barChartData.push({data: other, label: 'Other', stack:'a'})
        this.doughnutChartLabels = ['DNA','RNA','Other']

        for(let val of result){
          this.doughnutChartData.push([val.dna, val.rna, val.other]);
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
