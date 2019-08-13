import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tetrad',
  templateUrl: './tetrad.component.html',
  styleUrls: ['./tetrad.component.css']
})
export class TetradComponent implements OnInit {

  data: Tetrad = <Tetrad>{};

  tetradId: number;
  sub;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.tetradId = +params.get('tetradId');

      this.http.get<Tetrad>(this.baseUrl + 'api/Tetrad/GetTetradById?id=' + this.tetradId).subscribe(result => {
        this.data.id = result.id;
        this.data.quadruplexId = result.quadruplexId;
        this.data.pdbId = result.pdbId;
        this.data.assemblyId = result.assemblyId;
        this.data.molecule = result.molecule;
        this.data.sequence = result.sequence;
        this.data.onzClass = result.onzClass;
        this.data.planarity = result.planarity;
        this.data.experiment = result.experiment;

        this.http.get<number[]>(this.baseUrl + 'api/Tetrad/GetOtherTetradsInTheSamePdb?tetradId=' + this.data.id + '&pdbId=' + this.data.pdbId).subscribe(result => {
          this.data.tetradsInTheSamePdb = result;
        }, error => console.error(error));

        this.http.get<number[]>(this.baseUrl + 'api/Tetrad/GetOtherTetradsInTheSameQuadruplex?tetradId=' + this.data.id + '&quadruplexId=' + this.data.quadruplexId).subscribe(result => {
          this.data.tetradsInTheSameQuadruplex = result;
        }, error => console.error(error));
      }, error => console.error(error));

      

      
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

interface Tetrad {
  id: number;
  quadruplexId: number;
  pdbId: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  onzClass: string;
  planarity: string;
  structure3D: string;
  tetradsInTheSameQuadruplex: number[];
  tetradsInTheSamePdb: number[];
  experiment: string;
}
