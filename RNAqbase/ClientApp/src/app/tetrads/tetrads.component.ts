import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tetrads',
  templateUrl: './tetrads.component.html'
})
export class TetradsComponent {
  public tetrads: Tetrad[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Tetrad[]>(baseUrl + 'api/TetradReference/GetTetrads').subscribe(result => {
      this.tetrads = result;
    }, error => console.error(error));
  }
}

interface Tetrad {
  id: number;
  quadruplexId: number;
  pdbId: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  onz: string;
  select: boolean;
}
