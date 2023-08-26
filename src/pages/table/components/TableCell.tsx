import { StyledTableCell, StyledTableCellItem } from '../../../common/components/styled/table/StyledTableCell';
import { StyledTableInput } from '../../../common/components/styled/table/StyledTableInput';
import { TableEditableCell } from '../../../types/TableEditableCell';

interface Props {
    data: { field: string; value: string; rowIndex: number };
    editableCell: TableEditableCell;
    handleChangeEditableCell: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleKeyChanges: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleSetEditableCell: (rowIndex: number, field: string, value: string) => void;
}

const TableCell = (props: Props) => {
    const { data, editableCell, handleChangeEditableCell, handleChangeBlur, handleKeyChanges, handleSetEditableCell } =
        props;
    const { field, value, rowIndex } = data;

    return (
        <StyledTableCell>
            {rowIndex === editableCell?.rowIndex && editableCell.field === field ? (
                <StyledTableInput
                    type="text"
                    onChange={handleChangeEditableCell}
                    onBlur={handleChangeBlur}
                    onKeyDown={handleKeyChanges}
                    value={editableCell.value}
                    autoFocus
                />
            ) : (
                <StyledTableCellItem onDoubleClick={() => handleSetEditableCell(rowIndex, field, value)}>
                    {value}
                </StyledTableCellItem>
            )}
        </StyledTableCell>
    );
};

export default TableCell;
