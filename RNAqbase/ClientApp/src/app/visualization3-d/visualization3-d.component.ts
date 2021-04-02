import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {runInThisContext} from "vm";


@Component({
  selector: 'app-visualization3-d',
  templateUrl: './visualization3-d.component.html',
  styleUrls: ['./visualization3-d.component.css']
})
export class Visualization3DComponent implements OnInit {

  pdbId: string;
  url: string;
  liteMolPlugin;
  type = 'Surface';
  t: any;
  plugin: any;
  Transformer: any;
  selectedValue: string;

  types: Type[] = [
    {value: 'BallsAndSticks', viewValue: 'BallsAndSticks'},
    {value: 'Surface', viewValue: 'Surface'},
    {value: 'VDWBalls', viewValue: 'VDWBalls'}
  ];


  constructor(public dialogRef: MatDialogRef<Visualization3DComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.pdbId = this.data.pdbId;
    this.url = this.data.url;
    console.log(this.url);
    this.show3DVisualization();
  }

  ChangeType(type: string){
    this.addStructure(this.Transformer, this.plugin, type)
  }


  addStructure(Transformer: any, plugin: any, type: string){
    this.t = this.plugin.createTransform();
    this.t.add(plugin.root, Transformer.Data.Download, {
      url: this.url,
      type: 'String',
      id: this.pdbId,
    })
      .then(
        Transformer.Molecule.CreateFromData,
        { format: LiteMol.Core.Formats.Molecule.SupportedFormats.mmCIF },
        {}
      )
      .then(
        Transformer.Molecule.CreateModel,
        { modelIndex: 0 },
        { ref: 'model' }
      )
      .then(Transformer.Molecule.CreateVisual, {
        style: LiteMol.Bootstrap.Visualization.Molecule.Default.ForType.get(
          type
        )
      });
    plugin.applyTransform(this.t);

  }


  show3DVisualization() {
    this.plugin = LiteMol.Plugin.create({
      target: '#litemol',
      layoutState: {
        hideControls: true,
        collapsedControlsLayout:
        LiteMol.Bootstrap.Components.CollapsedControlsLayout.Landscape,
      },
      viewportBackground: '#fff',
      allowAnalytics: true
    });

    this.Transformer = LiteMol.Bootstrap.Entity.Transformer;
    this.addStructure(this.Transformer, this.plugin, 'BallsAndSticks')
  }
}



interface DialogData {
  pdbId: string;
  url: string;
}

interface Type {
  value: string;
  viewValue: string;
}

