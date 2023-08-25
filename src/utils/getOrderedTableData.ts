import { TableRow } from "../types/TableRow";
import { pick } from "lodash";

export const getOrderedTableData = (data: TableRow[], keys: string[]) => {
  return data ? data.map((obj) => pick(obj, keys)) : [];
};