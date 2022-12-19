import { DialogInput } from "./dialog-input";
import { ViewValue } from "./view-value";

export interface DialogData {
  attrID: string;
  attrName: string;
  value: string;
  operator: string;
  operators: ViewValue[];
  inputProperties: DialogInput;
}
