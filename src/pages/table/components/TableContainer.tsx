import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { RemoveIcon } from '../../../common/components/styled/RedRemoveIcon';
import { StyledTable } from '../../../common/components/styled/table/StyledTable';
import { StyledTableCellRemoveIcon } from '../../../common/components/styled/table/StyledTableCellRemoveIcon';
import { StyledTableContainer } from '../../../common/components/styled/table/StyledTableContainer';
import { StyledTableContainerRemove } from '../../../common/components/styled/table/StyledTableContainerRemove';
import { StyledTableHeaderRemoveIcon } from '../../../common/components/styled/table/StyledTableHeaderRemoveIcon';
import { TableButtonAddRow } from '../../../common/components/styled/table/TableButtonAddRow';
import { TableButtonAddContainer } from '../../../common/components/styled/table/TableButtonAddContainer';
import { EditableTableKeys } from '../../../types/TableRow';
import { TableContext } from '../TablePage';
import { TableCreator } from '../creator/TableCreator';
import { TableEditableCell } from '../../../types/TableEditableCell';
import TableCell from './TableCell';
import { TableHeader } from './TableHeader';

export const TableContainer = () => {
    const { tableData, setTableData, tableKeys } = useContext(TableContext);
    const [editableCell, setEditableCell] = useState<TableEditableCell>(null);
    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleChangeEditableCell = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (editableCell) {
            setEditableCell({ ...editableCell, value });
        }
    };

    const handleSetEditableCell = (rowIndex: number, field: EditableTableKeys, value: string) => {
        setEditableCell({ rowIndex, field, value });
    };

    const handleChangeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!editableCell) {
            return;
        }

        const { rowIndex, field, value } = editableCell;

        if (!value) {
            e.preventDefault();
            e.target.focus();
            return toast.error(`Cell couldn't be empty`);
        }

        const copiedTableData = [...tableData];
        copiedTableData[rowIndex] = { ...copiedTableData[rowIndex], [field]: value };

        setTableData && setTableData(copiedTableData);
        setEditableCell(null);
    };

    const handleKeyChanges = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setEditableCell(null);
        }
    };

    const handleRemoveTableRow = (indexToRemove: number) => {
        if (tableData.length === 1) {
            return toast.error(`The table couldn't be empty`);
        }

        const updatedTableData = tableData.filter((_, rowIndex) => rowIndex !== indexToRemove);

        setTableData && setTableData(updatedTableData);
    };

    return (
        <>
            {tableKeys && (
                <>
                    <TableCreator open={open} handleClose={handleModalClose} tableKeys={tableKeys} />

                    <TableButtonAddContainer>
                        <TableButtonAddRow onClick={handleModalOpen}>Add new row</TableButtonAddRow>
                    </TableButtonAddContainer>

                    <StyledTable>
                        <StyledTableContainer $columns={tableKeys.length}>
                            <TableHeader tableKeys={tableKeys} />

                            {tableData.map((row, rowIndex) =>
                                Object.entries(row).map(([field, value]) => (
                                    <TableCell
                                        key={`${field}-${rowIndex}`}
                                        data={{ field, value, rowIndex }}
                                        editableCell={editableCell}
                                        handleChangeEditableCell={handleChangeEditableCell}
                                        handleChangeBlur={handleChangeBlur}
                                        handleKeyChanges={handleKeyChanges}
                                        handleSetEditableCell={handleSetEditableCell}
                                    />
                                ))
                            )}
                        </StyledTableContainer>

                        <StyledTableContainerRemove $columns={1}>
                            <StyledTableHeaderRemoveIcon>Remove</StyledTableHeaderRemoveIcon>

                            {tableData.map((_, rowIndex) => (
                                <StyledTableCellRemoveIcon key={`remove-${rowIndex}`}>
                                    <RemoveIcon onClick={() => handleRemoveTableRow(rowIndex)} />
                                </StyledTableCellRemoveIcon>
                            ))}
                        </StyledTableContainerRemove>
                    </StyledTable>
                </>
            )}
        </>
    );
};
