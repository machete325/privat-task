import React, { createContext, useEffect, useState } from 'react';
import { getTableData } from '../../api/table/getTableData';
import { Loader } from '../../common/components/common/Loader';
import { Page } from '../../common/components/styled/Page';
import { Loading, LoadingState } from '../../common/components/types/loading';
import { getInitialLoadingState } from '../../common/utils';
import { TableRow } from '../../types/TableRow';
import { getOrderedTableData } from '../../utils/getOrderedTableData';
import { TableContainer } from './components/TableContainer';

interface TableContextProps {
    tableData: TableRow[];
    setTableData: React.Dispatch<React.SetStateAction<TableRow[]>> | undefined;
    tableKeys: string[] | null;
    loading: LoadingState;
}

const initTableState = () => {
    return {
        tableData: [],
        setTableData: undefined,
        tableKeys: null,
        loading: getInitialLoadingState(),
    };
};

export const TableContext = createContext<TableContextProps>(initTableState());

export const TablePage = () => {
    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [tableKeys, setTableKeys] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<LoadingState>(getInitialLoadingState());

    const getTableItems = async () => {
        try {
            setLoading({ ...loading, status: Loading.REQUEST });

            const data = await getTableData();
            const tableKeys = data[0] ? Object.keys(data[0]) : null;
            const orderedData = tableKeys ? getOrderedTableData(data, tableKeys) : [];

            setTableData(orderedData);
            setTableKeys(tableKeys);

            setLoading({ ...loading, status: Loading.SUCCESS });
        } catch (e) {
            console.log(e);
            setLoading({ ...loading, status: Loading.FAILURE });
        }
    };

    useEffect(() => {
        getTableItems();
    }, []);

    if (loading.status === Loading.REQUEST) {
        return (
            <Page>
                <Loader />
            </Page>
        );
    }

    return (
        <TableContext.Provider
            value={{ tableData: tableData, setTableData: setTableData, tableKeys: tableKeys, loading: loading }}
        >
            <Page>{loading.status === Loading.SUCCESS && <TableContainer />}</Page>
        </TableContext.Provider>
    );
};
