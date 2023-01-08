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
    "seqOfTetrads": ValueDialogComponent,
    "seqOfQuad": ValueDialogComponent,
    "webbaDaSilva": WebbaDaSilvaDialogComponent,
    "loopLen": ValOperDialogComponent
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
    "loopLen": [{ value: ">=", viewValue: "\&#x2265" },
      { value: "<=", viewValue: "\&#x2264" }],
    "seqOfTetrads": [{ value: "includes", viewValue: "includes" }],
    "seqOfQuad": [{ value: "5\'->3\'", viewValue: "5\'->3\'"}]
  }

  public static inputProperties: { [key: string]: DialogInput } = {
    "authorName": { type: 'text', minLength: 1, maxLength: 220 },
    "pdbID": { type: 'text', minLength: 1, maxLength: 4 },
    "keyword": { type: 'text', minLength: 1, maxLength: 200 },
    "gtractSeq": { type: 'text', minLength: 1, maxLength: 100 },
    "noOfTetrads": { type: 'number', minLength: 1, maxLength: 100 },
    "pdbDeposition": { type: 'date', minLength: 1, maxLength: 10 },
    "loopLen": { type: 'number', minLength: 0, maxLength: 300 },
    "seqOfTetrads": { type: 'text', minLength: 2, maxLength: 4 },
    "seqOfQuad": { type: 'text', minLength: 1, maxLength: 200 }
  }

  public static decodedOperators = {
    ">=": "\&#x2265",
    "<=": "\&#x2264",
    "5\'->3\'": "5\' \&#x2794 3\'",
    "=": "=",
    "!=": "!=",
    "includes": "includes"
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
