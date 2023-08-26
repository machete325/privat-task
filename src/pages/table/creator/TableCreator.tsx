import { useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import { LinkedTextField } from '../../../common/form/LinkedTextField';
import { TableInputSchema } from '../../../schemas/TableInputSchema';
import { TableRow } from '../../../types/TableRow';
import { TableContext } from '../TablePage';
import { BaseCreator } from './TableModalCreator';

interface Props {
    open: boolean;
    tableKeys: string[];
    handleClose: VoidFunction;
}

export const TableCreator = ({ open, handleClose, tableKeys }: Props) => {
    const { tableData, setTableData } = useContext(TableContext);

    const handleSubmit = (newRow: TableRow) => {
        setTableData && setTableData([...tableData, newRow]);
        handleClose();
        return toast.success('Row created successfully');
    };

    const initialValues = useMemo(() => {
        return tableKeys.reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {} as { [key: string]: string });
    }, [tableKeys]);

    return (
        <BaseCreator
            initialValues={initialValues}
            validationSchema={TableInputSchema(tableKeys)}
            onSubmit={handleSubmit}
            open={open}
            onClose={handleClose}
            title="Add new row"
        >
            {tableKeys.map((key) => (
                <LinkedTextField key={key} type="text" path={key} label={key} />
            ))}
        </BaseCreator>
    );
};
