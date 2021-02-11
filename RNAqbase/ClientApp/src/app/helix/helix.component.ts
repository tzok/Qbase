import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
import { Visualization3DComponent } from '../visualization3-d/visualization3-d.component';
import { ArcdiagramComponent } from '../arcdiagram/arcdiagram.component';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import { VisualizationComponent } from '../visualization/visualization.component';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import * as svg from 'save-svg-as-png';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import { saveAs } from "file-saver";


@Component({
  selector: 'app-helix',
  templateUrl: './helix.component.html',
  styleUrls: ['./helix.component.css']
})


export class HelixComponent implements OnInit {

  data: HelixReference;
  tetrads: TetradReference[];
  tetradsInformation: TetradInformations[] = [];
  tetradsPairsInformation: TetradPairsInformations[] = [];
  quadruplexes: QuadruplexReference[];
  quadruplexInformation: QuadruplexReference[] = [];
  HelixReferenceInformations: HelixReferenceInformations;
  helixId: number;
  sub;
  svg_varna: SafeHtml;
  svg_arc: SafeHtml;
  svg_varna_icon: SafeHtml;
  svg_arc_icon: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog)
    { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.helixId = +params.get('helixId');

      this.http.get<HelixReference>(this.baseUrl + 'api/Helix/GetHelixReferenceById?id=' + this.helixId).subscribe(result => {

        this.data = result;
       // this.data.tetradsIds = result.tetrads.join(";");
       // this.data.quadruplexIds = result.quadruplexes.join(";")

        this.data.arcDiagram = this.setId(result.arcDiagram, '_arc');
        this.svg_arc = this.sanitizer.bypassSecurityTrustHtml(this.data.arcDiagram);
        this.data.arcDiagram_icon = this.setId(result.arcDiagram, '_arc');
        this.data.arcDiagram_icon = this.setSize(this.data.arcDiagram_icon);
        this.svg_arc_icon = this.sanitizer.bypassSecurityTrustHtml(this.data.arcDiagram_icon);


        this.data.visualization2D = this.setId(result.visualization2D, '_varna');
        this.svg_varna = this.sanitizer.bypassSecurityTrustHtml(this.data.visualization2D);
        this.data.visualization2D_icon = this.setId(result.visualization2D, '_varna');
        this.data.visualization2D_icon = this.setSize(this.data.visualization2D_icon);
        this.svg_varna_icon = this.sanitizer.bypassSecurityTrustHtml(this.data.visualization2D_icon);

        this.HelixReferenceInformations = {
          id: 'H' + this.data.id_updated,
          pdbIdentifier: this.data.pdbIdentifier,
          assemblyId: this.data.assemblyId,
          molecule: this.data.molecule,
          experiment: this.data.experiment,
          sequence: this.data.sequence,
          numberOfStrands: this.data.numberOfStrands,
          numberOfQudaruplexes: this.data.numberOfQudaruplexes,
          numberOfTetrads: this.data.numberOfTetrads,
          //tetradsIds: this.data.tetradsIds,
          //quadruplexIds: this.data.quadruplexIds,
          dot_bracket: this.data.dot_bracket
        }

        this.http.get<TetradReference[]>(this.baseUrl + '' + 'api/Tetrad/GetListOfTetradsInHelix?id=' + '' + this.data.id).subscribe(result => {
          this.tetrads = result;
          console.log(this.tetrads);

          for (let val of result) {
            if(val.tetrad2_id != 0) {
              let quadruplex = null;
              if (val.quadruplex_id == val.quadruplex_pair_id)
                quadruplex = 'Q' + val.quadruplex_id;
              this.tetradsPairsInformation.push({
                TetradId: 'T' + val.id,
                TetradPairId: 'T' + val.tetrad2_id,
                quadruplex_id:  quadruplex,
                twist: val.twist,
                rise: val.rise,
                direction: val.direction
              });
            }
          }

          for (let val of result) {
            this.tetradsInformation.push({
              id: 'T' + val.id,
              quadruplex_id: 'Q' + val.quadruplex_id,
              sequence: val.sequence,
              onzClass: val.onzClass,
              planarity: val.planarity
            });
          }

        }, error => console.error(error));

        this.http.get<QuadruplexReference[]>(this.baseUrl + '' + 'api/Quadruplex/GetListOfQuadruplex?id=' + '' + this.data.id).subscribe(result => {
          this.quadruplexes = result;

          for (let val of result) {
            this.quadruplexInformation.push({
              id: 'Q' + val.id,
              pdbIdentifier: val.pdbIdentifier,
              assemblyId: val.assemblyId,
              molecule: val.molecule,
              experiment: val.experiment,
              numberOfStrands: val.numberOfStrands,
              numberOfTetrads: val.numberOfTetrads,
              type: val.type,
              sequence: val.sequence,
              onzmClass: val.onzmClass
            });
          }
          }, error => console.error(error));


      }, error => console.error(error));

    });
  }

  setId(image: any, label: string) {
    let tmp = image.indexOf( "<svg" ) + 4;
    let id = " id=" + this.data.id + label;
    image = [image.slice(0, tmp), id, image.slice(tmp)].join('');
    return image;
  }

  setSize(image: any){
    let tmp = image.indexOf( "<svg" ) + 4;
    let id = " width=150px height=150px ";
    image = [image.slice(0, tmp), id, image.slice(tmp)].join('');
    return image;

  }

  downloadZip() {
    //let images = ["/qbase-static/" + this.tetradInformations.id + ".png", "/qbase-static/" + this.tetradInformations.id + ".png"]
    //for (let image of images) {
    //console.log(image);
    // }
    this.loadSvgData("/qbase-static/H" + this.data.id + ".png", this.saveAsZip);
  }

  private loadSvgData(url: string, callback: Function) : void{
    this.http.get(url, { responseType: "arraybuffer" })
      .subscribe(x => callback(x, this.quadruplexInformation, this.HelixReferenceInformations,this.tetradsInformation, this.tetradsPairsInformation, this.generateFile));
  }

  private saveAsZip(content: Blob, quadruplexInformation: any, helixReferenceInformations: any, tetradsInformation: any, tetradsPairsInformation: any,  generateFile) : void{
    let helix = generateFile([helixReferenceInformations])
    let quadruplex = generateFile(quadruplexInformation)
    let tetrads = generateFile(tetradsInformation)
    let tetradsPairs = generateFile(tetradsPairsInformation)
    let zip = new JSZip();

    zip.file("helix" + ".csv", helix);
    zip.file("tetrads" + ".csv", tetrads);
    zip.file("tetradsPairs" + ".csv", tetradsPairs)
    zip.file("quadruplex" + ".csv", quadruplex)
    zip.file("3d_structure.png", content);
    zip.generateAsync({ type: "blob" })
      .then(blob => saveAs(blob,'data.zip'));
  };


  saveZip(){
  let helix = this.generateFile([this.HelixReferenceInformations])
  let tetrads = this.generateFile(this.tetradsInformation)
  let tetradsPairs = this.generateFile(this.tetradsPairsInformation)
  let quadruplex = this.generateFile(this.quadruplexInformation)

  let zip = new JSZip();
  zip.file("helix" + ".csv", helix);
  zip.file("tetrads" + ".csv", tetrads);
  zip.file("tetradsPairs" + ".csv", tetradsPairs)
  zip.file("quadruplex" + ".csv", quadruplex)

  zip.generateAsync({type: "blob"}).then(function(content) {
    FileSaver.saveAs(content, "data.zip");
  });

  //svg.saveSvgAsPng(document.getElementById(this.data.id.toString() + "_arc"), 'Arc_diagram.png');
  //svg.saveSvgAsPng(document.getElementById(this.data.id.toString() + '_varna'), 'VARNA_drawing.png');
}

  generateFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    return  new Blob([csvArray], {type: 'text/csv' })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showStructure() {
    let dialogRef = this.dialog.open(Visualization3DComponent, {
      data: {
        pdbId: this.data.pdbId,
        url: this.baseUrl + 'api/Helix/GetHelix3dVisualizationMethod?id=' + this.data.id

      }
    });
  }

  showVarna() {
    let diagram = this.dialog.open(VisualizationDialogComponent, { data: { svg: this.data.visualization2D, id: this.data.id} });
  }

  showDiagram() {
    let diagram = this.dialog.open(ArcdiagramComponent, { data: { svg: this.data.arcDiagram, id: this.data.id } });
  }

  setTwoNumberDecimal(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  };


}

interface HelixReference {
  id: string;
  id_updated:string;
  pdbId: string;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string
  sequence: string;
  numberOfStrands: string;
  numberOfQudaruplexes: number;
  numberOfTetrads: number;
  tetrads: number[];
  quadruplexes: number[];
 // tetradsIds: string;
 // quadruplexIds: string;
  visualization3D: any;
  arcDiagram: string;
  visualization2D: string;
  arcDiagram_icon: string;
  visualization2D_icon: string;
  dot_bracket: string;

}

interface HelixReferenceInformations {
  id: any;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string
  sequence: string;
  numberOfStrands: string;
  numberOfQudaruplexes: number;
  numberOfTetrads: number;
  //tetradsIds: any;
  //quadruplexIds: any;
  dot_bracket: string;
}



interface QuadruplexReference {
  id: any;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
  numberOfStrands: string;
  numberOfTetrads: number;
  type: string;
  sequence: string;
  onzmClass: string;
}

interface TetradReference {
  id: any;
  quadruplex_id: any;
  quadruplex_pair_id: any;
  sequence: string;
  onzClass: string;
  twist: number;
  rise: number;
  planarity: number;
  tetrad2_id: number;
  direction: string;
}

interface TetradInformations {
  id: any;
  quadruplex_id: any;
  sequence: string;
  onzClass: string;
  planarity: number;
}

interface TetradPairsInformations {
  TetradId: any;
  TetradPairId: any;
  quadruplex_id: any;
  twist: number;
  rise: number;
  direction: string;
}
