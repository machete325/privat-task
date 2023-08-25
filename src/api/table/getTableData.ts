import { TableRow } from "../../types/TableRow";

const tableData = [
  { firstName: 'John', lastName: 'Doe', nationality: 'Ukrainian', city: 'New York' },
  { firstName: 'Jane', nationality: 'Hispanic', lastName: 'Smith', city: 'Los Angeles' },
  { firstName: 'Michael', lastName: 'Johnson', nationality: 'American', city: 'Chicago' },
  { firstName: 'Emily', lastName: 'Williams', nationality: 'Ukrainian', city: 'Houston' },
];

export const getTableData = (): Promise<TableRow[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tableData);
    }, 5000);
  });
}