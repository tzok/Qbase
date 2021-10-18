import {Component, OnInit, Inject, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material';
import {Visualization3DComponent} from '../visualization3-d/visualization3-d.component';
import {VisualizationDialogComponent} from '../visualization-dialog/visualization-dialog.component';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import * as svg from 'save-svg-as-png';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {saveAs} from "file-saver";


@Component({
  selector: 'app-helix',
  templateUrl: './helix.component.html',
  styleUrls: ['./helix.component.css']
})


export class HelixComponent implements OnInit {
  _3d_structure;
  _3d_layers;
  _2d_structure_varna;
  _2d_structure_rchie;

  data: HelixReference;
  tetrads: TetradReference[];
  tetradsInformation: TetradInformations[] = [];
  tetradsPairsInformation: TetradPairsInformations[] = [];
  quadruplexes: QuadruplexReference[];
  quadruplexInformation: QuadruplexReference[] = [];
  nucleotideChiValues: NucleotideChiValues[];
  helixId: number;
  sub;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.helixId = +params.get('helixId');
      this.http.get<HelixReference>(this.baseUrl + 'api/Helix/GetHelixReferenceById?id=' + this.helixId).subscribe(result => {
        this.data = result;
        this.data.id = 'H' + this.data.id;
        this.http.get<TetradReference[]>(this.baseUrl + '' + 'api/Tetrad/GetListOfTetradsInHelix?id=' + '' + this.data.id.slice(1)).subscribe(result => {
          this.tetrads = result;
          for (let val of result) {
            if (val.tetrad2_id != 0) {
              let quadruplex = null;
              if (val.quadruplex_id == val.quadruplex_pair_id)
                quadruplex = 'Q' + val.quadruplex_id;
              this.tetradsPairsInformation.push({
                TetradId: 'T' + val.id,
                TetradPairId: 'T' + val.tetrad2_id,
                quadruplex_id: quadruplex,
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

        this.http.get<QuadruplexReference[]>(this.baseUrl + '' + 'api/Quadruplex/GetListOfQuadruplex?id=' + '' + this.data.id.slice(1)).subscribe(result => {
          this.quadruplexes = result;
          for (let val of result) {
            this.quadruplexInformation.push({
              id: 'Q' + val.id,
              pdbIdentifier: val.pdbIdentifier,
              assemblyId: val.assemblyId,
              molecule: val.molecule,
              experiment: val.experiment,
              typeOfStrands: val.typeOfStrands,
              numberOfTetrads: val.numberOfTetrads,
              type: val.type,
              sequence: val.sequence,
              onzmClass: val.onzmClass
            });
          }
        }, error => console.error(error));

        this.http.get<NucleotideChiValues[]>(this.baseUrl + '' + 'api/Helix/GetNucleotideChiValues?id=' + '' + this.data.id.slice(1)).subscribe(result => {
          this.nucleotideChiValues = result;
          for (let val of this.nucleotideChiValues) {
            val.tetrad_id = 'T' + val.tetrad_id;
          }
        }, error => console.error(error));
      }, error => console.error(error));
    });
  }

  downloadZip(): void {
    this.http.get("/static/pymol/" + this.data.id + ".png", {responseType: "arraybuffer"})
      .subscribe(data => {
        this._3d_structure = data;

        this.http.get("/static/varna/" + this.data.id + ".svg", {responseType: "arraybuffer"})
          .subscribe(data => {
            this._2d_structure_varna = data;

            this.http.get("/static/rchie/" + this.data.id + ".svg", {responseType: "arraybuffer"})
              .subscribe(data => {
                this._2d_structure_rchie = data;

                this.http.get("/static/layers/" + this.data.id + ".svg", {responseType: "arraybuffer"})
                  .subscribe(data => {
                    this._3d_layers = data;

                    var zip = new JSZip();
                    let helix = this.generateFile([this.data]);
                    let quadruplex = this.generateFile(this.quadruplexInformation);
                    let tetrads = this.generateFile(this.tetradsInformation)
                    let tetradsPairs = this.generateFile(this.tetradsPairsInformation);
                    let nucleotides = this.generateFile(this.nucleotideChiValues);

                    zip.file("3d_structure.png", this._3d_structure);
                    zip.file("2d_structure_varna.svg", this._2d_structure_varna);
                    zip.file("2d_structure_rchie.svg", this._2d_structure_rchie);
                    zip.file("3d_structure_layers.svg", this._3d_layers);
                    zip.file("helix" + ".csv", helix);
                    zip.file("quadruplex" + ".csv", quadruplex);
                    zip.file("tetrads" + ".csv", tetrads);
                    zip.file("nucleotides_in_helice" + ".csv", nucleotides)
                    zip.file("tetrads_pairs" + ".csv", tetradsPairs)
                    zip.generateAsync({type: "blob"})
                      .then(blob => saveAs(blob, 'data.zip'));

                  });
              });
          });
      });
  }

  generateFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    return new Blob([csvArray], {type: 'text/csv'})
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  show3dStructure() {
    let dialogRef = this.dialog.open(Visualization3DComponent, {
      data: {
        pdbId: this.data.pdbId,
        url: this.baseUrl + 'api/Helix/GetHelix3dVisualizationMethod?id=' + this.data.id.slice(1)
      }
    });
  }

  show2dStructure(type: any) {
    let dialogRef = this.dialog.open(VisualizationDialogComponent, {
      data: {type: type, id: this.data.id},
    });
  }

  setTwoNumberDecimal(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  truncate(source) {
    let size = 30;
    let result = source.slice(0, 4);
    for (let i = 4; i < source.length; i += 4) {
      result += ',' + source.slice(i, i + 4);
    }
    return result.length > size ? result.slice(0, size - 1) + "…" : result;
  }
}

interface HelixReference {
  id: string;
  pdbId: string;
  pdbIdentifier: string;
  title: string;
  assemblyId: number;
  molecule: string;
  experiment: string
  sequence: string;
  typeOfStrands: string;
  numberOfQudaruplexes: number;
  numberOfTetrads: number;
  dot_bracket: string;
}

interface QuadruplexReference {
  id: any;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  experiment: string;
  typeOfStrands: string;
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

interface NucleotideChiValues {
  tetrad_id: any;
  n1_chi: number;
  n1_glycosidic_bond: string;
  n2_chi: number;
  n2_glycosidic_bond: string;
  n3_chi: number;
  n3_glycosidic_bond: string;
  n4_chi: number;
  n4_glycosidic_bond: string;
}
