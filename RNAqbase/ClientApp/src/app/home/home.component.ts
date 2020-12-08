import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'app';
  public pieChartLabels:string[] = ["Tetrads", "Quadruplexes", "Helices", "Structures"];
  public pieChartData:number[] = [1547, 484, 450, 484];
  public pieChartType:any = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
      "#db0909",
      "#54c40e",
      "#ffc90f",
      "#0654ee"
    ],
    responsive: true,
    legend: { position: "right" },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },}

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }

  public barChartOptions: any = {
    responsive: true,
  };
  public barChartLabels:string[] = ["Tetrads", "Quadruplexes", "Helices", "Structures"];

  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [1361, 431, 418, 431], label: 'Before update', stack: 'a' },
    { data: [186, 53, 32, 53], label: 'Added', stack: 'a' }
  ];


}
