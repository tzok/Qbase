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
    console.log(this.data.url);
    console.log(this.pdbId);
    this.pdbId = this.data.pdbId;
    this.url = this.data.url;
    this.show3DVisualization();
  }

  show3DVisualization(){
    const plugin = LiteMol.Plugin.create({
      target: '#litemol',
      layoutState: {
        hideControls: true,
        collapsedControlsLayout:
        LiteMol.Bootstrap.Components.CollapsedControlsLayout.Landscape,
      },
      viewportBackground: '#fff',
    });

    const Transformer = LiteMol.Bootstrap.Entity.Transformer;

    const t = plugin.createTransform();
    t.add(plugin.root, Transformer.Data.Download, {
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
          'BallsAndSticks'
        ),
      });
    plugin.applyTransform(t);

  }
}

interface DialogData {
  pdbId: string;
  url: string;
}
