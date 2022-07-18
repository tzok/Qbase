import { Component } from '@angular/core';


export interface Condition {
  condition: string;
  operator: string;
}

export interface TableElements {
  attribute: string;
  isOperator: boolean;
  conditions: Array<Condition>;
  addable: boolean;
}

const SEARCH_TABLE_ELEMENTS: Array<TableElements> = [
  {
    attribute: 'Author Name', isOperator: true, conditions: [
      { condition: 'Kokosza', operator: '!=' },
      { condition: 'Kremis', operator: '=' },
      { condition: 'Matecki', operator: '=' },
      { condition: 'Lukasiewicz', operator: '=' }], addable: true},
  {
    attribute: 'PDB ID', isOperator: false, conditions: [
      { condition: '1234', operator: '' },
      { condition: '4321', operator: '' }], addable: true},
  {
    attribute: 'Keyword', isOperator: false, conditions: [
      { condition: 'Kokosza', operator: '' },
      { condition: 'Kremis', operator: '' }], addable: true},
  {
    attribute: 'Experimental Method', isOperator: false, conditions: [
      { condition: 'any', operator: '' },
      { condition: 'X-Ray', operator: '' },
      { condition: 'NMR', operator: '' }], addable: false},
  {
    attribute: 'Molecule Type', isOperator: false, conditions: [
      { condition: 'any', operator: '' },
      { condition: 'DNA', operator: '' },
      { condition: 'RNA', operator: '' },
      { condition: 'other', operator: '' }], addable: false},
  {
    attribute: 'Type (by no. of strands)', isOperator: false, conditions: [
      { condition: 'any', operator: '' },
      { condition: 'unimolecular', operator: '' },
      { condition: 'bimolecular', operator: '' },
      { condition: 'tetramolecular', operator: '' }], addable: false},
  {
    attribute: 'Handedness', isOperator: false, conditions: [
      { condition: 'any', operator: '' },
      { condition: 'right', operator: '' },
      { condition: 'left', operator: '' }], addable: false},
  {
    attribute: 'Number of tetrads', isOperator: true, conditions: [
      { condition: '3', operator: '>' },
      { condition: '2', operator: '<' },
      { condition: '10', operator: '>=' }], addable: true},
  {
    attribute: 'Ions', isOperator: false, conditions: [
      { condition: 'any', operator: '' },
      { condition: 'Na', operator: '' },
      { condition: 'K', operator: '' },
      { condition: 'Pt', operator: '' },
      { condition: 'Tl', operator: '' }], addable: false},
  {
    attribute: 'Webba da Silva', isOperator: false,  conditions: [
      { condition: 'any', operator: '' },
      { condition: 'web topology', operator: '' },
      { condition: 'tetrad comination', operator: '' }], addable: false},
  {
    attribute: 'ONZ class', isOperator: false, conditions: [
      { condition: 'Any', operator: '' },
      { condition: 'N-', operator: '' },
      { condition: 'Z-', operator: '' },
      { condition: 'O-', operator: '' }], addable: false},
  {
    attribute: 'PDB Deposition', isOperator: true, conditions: [
      { condition: '2010-03-21', operator: '<' },
      { condition: '2001-01-01', operator: '>=' }], addable: true},
  {
    attribute: 'G-tract sequence', isOperator: false, conditions: [
      { condition: 'GGGG', operator: '' },
      { condition: 'G', operator: '' }], addable: true},
  {
    attribute: 'Bulges', isOperator: false, conditions: [
      { condition: 'any', operator: '' },
      { condition: 'with bulges', operator: '' },
      { condition: 'without bulges', operator: '' }], addable: false},
  {
    attribute: 'V-Loops', isOperator: false, conditions: [
      { condition: 'any', operator: '' },
      { condition: 'with V-Loops', operator: '' },
      { condition: 'without V-Loops', operator: '' }], addable: false},
  {
    attribute: 'Sequence', isOperator: true, conditions: [
      { condition: 'GCGGGGGGGGG', operator: 'includes' },
      { condition: 'G', operator: "3'->5'" }], addable: true}
]



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  displayedColumns: string[] = ['attribute', 'conditions', 'addable'];
  dataSource = SEARCH_TABLE_ELEMENTS;



}
