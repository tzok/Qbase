import { DateOperDialogComponent } from "./date-oper-dialog/date-oper-dialog.component";
import { SeqDialogComponent } from "./seq-dialog/seq-dialog.component";
import { ValOperDialogComponent } from "./val-oper-dialog/val-oper-dialog.component";
import { ValueDialogComponent } from "./value-dialog/value-dialog.component";
import { WebbaDaSilvaDialogComponent } from "./webba-da-silva-dialog/webba-da-silva-dialog.component";

export class DialogChoice {
  public static modals = {
    "Author Name": ValOperDialogComponent,
    "PDB ID": ValueDialogComponent,
    "Keyword": ValueDialogComponent,
    "Number of tetrads": ValOperDialogComponent,
    "PDB Deposition": DateOperDialogComponent,
    "G-tract sequence": ValueDialogComponent,
    "Sequence": SeqDialogComponent,
    "Webba da Silva": WebbaDaSilvaDialogComponent
  }

  public static operators = {
    "Author Name": ["=", "!="],
    "Number of tetrads": ["=", ">", "<"],
    "PDB Deposition": ["=", ">", "<"],
    "Sequence": ["includes", "3\'->5\'", "5\'->3\'", "begins"]
  }

  public static chooseDialog(attr: string): any {
    let component = this.modals[attr];
    return component;
  }

  public static chooseOperators(attr: string): string[] {
    let component = this.operators[attr];
    return component;
  }
}
