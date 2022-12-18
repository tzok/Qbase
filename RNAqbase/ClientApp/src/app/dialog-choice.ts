import { DialogInput } from "./dialog-input";
import { ValOperDialogComponent } from "./val-oper-dialog/val-oper-dialog.component";
import { ValueDialogComponent } from "./value-dialog/value-dialog.component";
import { ViewValue } from "./view-value";
import { WebbaDaSilvaDialogComponent } from "./webba-da-silva-dialog/webba-da-silva-dialog.component";

export class DialogChoice {
  public static modals = {
    "Author Name": ValOperDialogComponent,
    "PDB ID": ValueDialogComponent,
    "Keyword": ValueDialogComponent,
    "Number of tetrads": ValOperDialogComponent,
    "PDB Deposition": ValOperDialogComponent,
    "G-tract sequence": ValueDialogComponent,
    "Sequence": ValOperDialogComponent,
    "Webba da Silva": WebbaDaSilvaDialogComponent
  }

  public static operators: { [key: string]: ViewValue[] } = {
    "Author Name": [{ value: "=", viewValue: "=" },
    { value: "!=", viewValue: "!=" }],
    "Number of tetrads": [{ value: "=", viewValue: "=" },
    { value: ">=", viewValue: "\&#x2265" },
    { value: "<=", viewValue: "\&#x2264" }],
    "PDB Deposition": [{ value: "=", viewValue: "=" },
    { value: ">=", viewValue: "\&#x2265" },
    { value: "<=", viewValue: "\&#x2264" }],
    "Sequence": [{ value: "includes", viewValue: "includes" },
    { value: "3\'->5\'", viewValue: "3\' \&#x2794 5\'" },
    { value: "5\'->3\'", viewValue: "5\' \&#x2794 3\'" },
    { value: "begins", viewValue: "begins" }]
  }

  public static inputProperties: { [key: string]: DialogInput } = {
    "Author Name": { type: 'text', maxLength: 220 },
    "PDB ID": { type: 'text', maxLength: 4 },
    "Keyword": { type: 'text', maxLength: 200 },
    "G-tract sequence": { type: 'text', maxLength: 100 },
    "Number of tetrads": { type: 'number', maxLength: 100 },
    "PDB Deposition": { type: 'date', maxLength: 10 },
    "Sequence": { type: 'text', maxLength: 200 }
  }

  public static decodedOperators = {
    ">=": "\&#x2265",
    "<=": "\&#x2264",
    "3\'->5\'": "3\' \&#x2794 5\'",
    "5\'->3\'": "5\' \&#x2794 3\'",
    "=": "=",
    "!=": "!=",
    "includes": "includes",
    "begins": "begins"
  }

  public static chooseDialog(attr: string): any {
    let component = this.modals[attr];
    return component;
  }

  public static chooseOperators(attr: string): ViewValue[] {
    let component = this.operators[attr];
    return component;
  }

  public static decodeOperators(oper: string): string {
    return this.decodedOperators[oper];
  }

  public static chooseInputProperties(attr: string): DialogInput {
    return this.inputProperties[attr];
  }
}
