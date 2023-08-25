import { FormikProps } from 'formik';
import { ReactNode } from 'react';
import { Schema } from 'yup';
import { LoadingState } from '../components/types/loading';

export interface LinkedMeta {
    error?: string;
    value: unknown;
    common: LabelInfo;
}

export interface LabelInfo {
    label?: ReactNode;
    required?: boolean;
}

export type FormContext<T> = FormikProps<T> & {
    validationSchema: Schema<T>;
    loading?: LoadingState;
};

export interface BasicLinkedFieldProps {
    path: string;
    helperText?: ReactNode;
}
