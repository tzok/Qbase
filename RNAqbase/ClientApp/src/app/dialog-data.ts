import { Condition } from "./condition";
import { DialogInput } from "./dialog-input";
import { ViewValue } from "./view-value";

export interface DialogData {
  attrID: string;
  attrName: string;
  conditions: Condition[];
  operators: ViewValue[];
  inputProperties: DialogInput;
}
