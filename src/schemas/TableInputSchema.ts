import {
    object,
    string,
    Schema,
} from 'yup';
import { TableRow } from '../types/TableRow';

export const TableInputSchema = (keys: string[]): Schema<TableRow> => {
    const shapeObject = keys.reduce((acc, key) => {
        acc[key] = string()
            .label(key)
            .required('Field is required');
        return acc;
    }, {} as Record<string, Schema<string>>);

    return object().shape(shapeObject);
};