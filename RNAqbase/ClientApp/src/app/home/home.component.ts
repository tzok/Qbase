import {Component, Inject, OnInit} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public barChartOptions: any = {
    responsive: true,
  };
  public barChartLabels: string[] = ["Tetrads", "Quadruplexes", "Helices", "Structures"];

  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {data: [0,0,0,0], label: 'Before update', stack: 'a'},
    {data: [0,0,0,0], label: 'Added', stack: 'a'}
  ];

  public barChartColors: Color[] = [
    {backgroundColor: "#45A29E"},
    {backgroundColor: "#57dbd5"},
  ]

  sub;
  count: componentsCount;
  update: updateInfotmations;


  constructor(private http: HttpClient,
              @Inject('BASE_URL') private baseUrl: string,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {

      this.http.get<updateInfotmations>(this.baseUrl + 'api/Statistics/GetUpdate').subscribe(result => {
        this.update = result;
        console.log(this.update);

      this.http.get<componentsCount>(this.baseUrl + 'api/Statistics/GetCount').subscribe(result => {
        this.count = result;
        console.log(this.count);



          this.barChartData =  [
            {data: [this.count.tetradCount-this.update.addedTetradCount, this.count.quadruplexCount-this.update.addedQuadruplexCount, this.count.helixCount-this.update.addedHelixCount, this.count.quadruplexCount-this.update.addedQuadruplexCount], label: 'Before update', stack: 'a'},
            {data: [this.update.addedTetradCount, this.update.addedQuadruplexCount, this.update.addedHelixCount, this.update.addedQuadruplexCount], label: 'Added', stack: 'a'}
          ];

      }, error => console.error(error));



      }, error => console.error(error));

    }, error => console.error(error));


  }

  getPlot(){
    this.barChartData =  [
      {data: [this.count.tetradCount-this.update.addedTetradCount, this.count.quadruplexCount-this.update.addedQuadruplexCount, this.count.helixCount-this.update.addedHelixCount, this.count.quadruplexCount-this.update.addedQuadruplexCount], label: 'Before update', stack: 'a'},
      {data: [this.update.addedTetradCount, this.update.addedQuadruplexCount, this.update.addedHelixCount, this.update.addedQuadruplexCount], label: 'Added', stack: 'a'}
    ];

  }
  getPdbRelease(){
    if(this.update.pdbRelease == null)
      return '-'
    return this.update.pdbRelease;
  }
}


interface componentsCount {
  helixCount: number;
  quadruplexCount: number;
  tetradCount: number;
}

interface updateInfotmations {
  addedHelixCount: number;
  addedQuadruplexCount: number;
  addedTetradCount: number;
  pdbRelease: string;
}
