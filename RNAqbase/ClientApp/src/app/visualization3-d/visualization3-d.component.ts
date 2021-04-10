import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {runInThisContext} from "vm";
import {Template} from "@angular/compiler/src/render3/r3_ast";


@Component({
  selector: 'app-visualization3-d',
  templateUrl: './visualization3-d.component.html',
  styleUrls: ['./visualization3-d.component.css']
})
export class Visualization3DComponent implements OnInit {

  pdbId: string;
  url: string;
  liteMolPlugin;
  type = 'BallsAndSticks';
  Coloring = ''
  t: any;
  plugin: any;
  Transformer: any;
  selectedValue: string;
  style:any;
  theme = LiteMol.Bootstrap.Visualization.Molecule.Default.Themes.filter(t => t.name === 'Element Symbol' )[0]


  types: Option[] = [
    {value: 'BallsAndSticks', viewValue: 'BallsAndSticks'},
    {value: 'Surface', viewValue: 'Surface'},
    {value: 'VDWBalls', viewValue: 'VDWBalls'}
  ];

  coloring: Option[] = [
    {value: 'Chain ID', viewValue: 'Chain ID'},
    {value: 'Entity ID', viewValue: 'Entity ID'},
    {value: 'Entity Type', viewValue: 'Entity Type'},
    {value: 'Residue Name', viewValue: 'Residue Name'},
    {value: 'Element Symbol', viewValue: 'Element Symbol'},
    {value: 'Rainbow (Chain)', viewValue: 'Rainbow (Chain)'},
    {value: 'Rainbow (Entity)', viewValue: 'Rainbow (Entity)'},
    {value: 'Uniform Color', viewValue: 'Uniform Color'}
  ];

  constructor(public dialogRef: MatDialogRef<Visualization3DComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.pdbId = this.data.pdbId;
    this.url = this.data.url;
    this.show3DVisualization();
  }

  ChangeType(type: string){
    this.type = type
    this.addStructure(this.Transformer, this.plugin, )
  }

  ChangeColoring(coloring: string){
   this.theme = LiteMol.Bootstrap.Visualization.Molecule.Default.Themes.filter(t => t.name === coloring )[0]
    this.addStructure(this.Transformer, this.plugin)
  }

  addStructure(Transformer: any, plugin: any){
    plugin.clear();
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
        style: {
          ...LiteMol.Bootstrap.Visualization.Molecule.Default.ForType.get(this.type),
          theme:
            {
              template: this.theme,
              colors: this.theme.colors,
              transparency: this.theme.transparency,
              interactive: true
            }
        }
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
    this.addStructure(this.Transformer, this.plugin)
  }
}

interface DialogData {
  pdbId: string;
  url: string;
}

interface Option {
  value: string;
  viewValue: string;
}
