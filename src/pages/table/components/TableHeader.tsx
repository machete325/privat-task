import { StyledTableHeader } from '../../../common/components/styled/table/StyledTableHeader';
import { EditableTableKeys } from '../../../types/TableRow';

interface Props {
    tableKeys: EditableTableKeys[];
}

export const TableHeader = ({ tableKeys }: Props) => {
    return (
        <>
            {tableKeys.map((column, index) => (
                <StyledTableHeader key={index}>{column}</StyledTableHeader>
            ))}
        </>
    );
};
