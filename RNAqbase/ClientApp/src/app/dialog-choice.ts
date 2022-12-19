import { DialogInput } from "./dialog-input";
import { ValOperDialogComponent } from "./val-oper-dialog/val-oper-dialog.component";
import { ValueDialogComponent } from "./value-dialog/value-dialog.component";
import { ViewValue } from "./view-value";
import { WebbaDaSilvaDialogComponent } from "./webba-da-silva-dialog/webba-da-silva-dialog.component";

export class DialogChoice {
  public static modals = {
    "authorName": ValOperDialogComponent,
    "pdbID": ValueDialogComponent,
    "keyword": ValueDialogComponent,
    "noOfTetrads": ValOperDialogComponent,
    "pdbDeposition": ValOperDialogComponent,
    "gtractSeq": ValueDialogComponent,
    "sequence": ValOperDialogComponent,
    "webbaDaSilva": WebbaDaSilvaDialogComponent
  }

  public static operators: { [key: string]: ViewValue[] } = {
    "authorName": [{ value: "=", viewValue: "=" },
    { value: "!=", viewValue: "!=" }],
    "noOfTetrads": [{ value: "=", viewValue: "=" },
    { value: ">=", viewValue: "\&#x2265" },
    { value: "<=", viewValue: "\&#x2264" }],
    "pdbDeposition": [{ value: "=", viewValue: "=" },
    { value: ">=", viewValue: "\&#x2265" },
    { value: "<=", viewValue: "\&#x2264" }],
    "sequence": [{ value: "includes", viewValue: "includes" },
    { value: "3\'->5\'", viewValue: "3\' \&#x2794 5\'" },
    { value: "5\'->3\'", viewValue: "5\' \&#x2794 3\'" },
    { value: "begins", viewValue: "begins" }]
  }

  public static inputProperties: { [key: string]: DialogInput } = {
    "authorName": { type: 'text', maxLength: 220 },
    "pdbID": { type: 'text', maxLength: 4 },
    "keyword": { type: 'text', maxLength: 200 },
    "gtractSeq": { type: 'text', maxLength: 100 },
    "noOfTetrads": { type: 'number', maxLength: 100 },
    "pdbDeposition": { type: 'date', maxLength: 10 },
    "sequence": { type: 'text', maxLength: 200 }
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
