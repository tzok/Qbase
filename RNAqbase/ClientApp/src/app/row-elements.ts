import { Condition } from "./condition";

export interface RowElements {
  attribute: string;
  isOperator: boolean;
  conditions: Array<Condition>;
  rowType: string;
  maxCondCount: number;
}
