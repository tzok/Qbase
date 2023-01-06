import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttrHttpGetService {

  constructor(private http: HttpClient) { }

  getData(attrID: string) {
    switch (attrID) {
      case 'expMethod':
        return this.getExperimentalMethod();
      case 'molType':
        return this.getMoleculeType();
      case 'onzClass':
        return this.getONZ();
      case 'webbaDaSilva':
        return this.getWebbaDaSilva();
      case 'ions':
        return this.getIons();
    }
  }

  getExperimentalMethod() {
    return this.http.get('api/Search/GetExperimentalMethod');
  }

  getONZ() {
    return this.http.get('api/Search/GetONZ');
  }

  getIons() {
    return this.http.get('api/Search/GetIons');
  }

  getMoleculeType() {
    return this.http.get('api/Search/GetMoleculeType');
  }

  getWebbaDaSilva() {
    return this.http.get('api/Search/GetWebbaDaSilva');
  }
}
