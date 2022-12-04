import { DateOperDialogComponent } from "./date-oper-dialog/date-oper-dialog.component";
import { SeqDialogComponent } from "./seq-dialog/seq-dialog.component";
import { ValOperDialogComponent } from "./val-oper-dialog/val-oper-dialog.component";
import { ValueDialogComponent } from "./value-dialog/value-dialog.component";
import { WebbaDaSilvaDialogComponent } from "./webba-da-silva-dialog/webba-da-silva-dialog.component";

export class DialogChoice {
  "Author Name": ValOperDialogComponent;
  "PDB ID": ValueDialogComponent;
  "Keyword": ValueDialogComponent;
  "Number of tetrads": ValOperDialogComponent;
  "PDB Desposition": DateOperDialogComponent;
  "G-tract sequence": ValOperDialogComponent;
  "Sequence": SeqDialogComponent;
  "Webba da Silva": WebbaDaSilvaDialogComponent;
}
