import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttrHttpGetService } from '../attr-http-get.service';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-webba-da-silva-dialog',
  templateUrl: './webba-da-silva-dialog.component.html',
  styleUrls: ['./webba-da-silva-dialog.component.css']
})
export class WebbaDaSilvaDialogComponent {
  conditions: string[] = [];
  selectedConditions = {};

  constructor(
    public dialogRef: MatDialogRef<WebbaDaSilvaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private httpService: AttrHttpGetService) { }

  ngOnInit() {
    //'webbaDaSilva'
    this.httpService.getData('ions').subscribe(result => {
      for (let i in result) {
        this.conditions.push(result[i].trim());
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    for (let val in this.selectedConditions) {
      if (this.selectedConditions[val])
        this.data.conditions.push({value:val, operator: ''})
    }
    this.dialogRef.close(this.data);
  }

  buttonState(): boolean {
    return !Object.values(this.selectedConditions).some(x => x === true)
  }
}
