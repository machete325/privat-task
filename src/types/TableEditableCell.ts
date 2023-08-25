import { EditableTableKeys } from "./TableRow";

export type TableEditableCell = {
  rowIndex: number;
  field: EditableTableKeys;
  value: string;
} | null