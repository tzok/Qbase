import { DialogInput } from "./dialog-input";
import { ViewValue } from "./view-value";

export interface DialogData {
  attr: string;
  value: string;
  operator: string;
  operators: ViewValue[];
  inputProperties: DialogInput;
}
