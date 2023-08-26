export interface TableRow {
  [key: string]: string;
}

export type EditableTableKeys = keyof TableRow;