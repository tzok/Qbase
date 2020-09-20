import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-visualization3-d',
  templateUrl: './visualization3-d.component.html',
  styleUrls: ['./visualization3-d.component.css']
})
export class Visualization3DComponent implements OnInit {

  pdbId: string;
  url: string;
  liteMolPlugin;

  constructor(public dialogRef: MatDialogRef<Visualization3DComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.pdbId = this.data.pdbId;
    this.url = this.data.url;
    this.show3DVisualization();
  }

  show3DVisualization() {

    if (!this.liteMolPlugin) {
      this.liteMolPlugin = LiteMol.Plugin.create({
        target: '#litemol'
      });
    }

    this.liteMolPlugin.loadMolecule({
      id: this.pdbId,
      format: 'cif', // or pdb, sdf, binarycif/bcif
      url: this.url,
    }).then(() => {
      console.log('Molecule loaded');
    }).catch(e => {
      console.error(e);
    });
  }

}

interface DialogData {
  pdbId: string;
  url: string;
}
