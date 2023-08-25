/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, isUndefined, } from 'lodash';
import { reach } from 'yup';
import { FormContext, LabelInfo, LinkedMeta, } from './types';

type FormValues = Record<string, any>;

export function getLinkedMeta(
    context: FormContext<FormValues>,
    path: string,
    overrides: LabelInfo,
): LinkedMeta {
    const { touched, errors } = context;

    let schema: any;
    let { label, required } = overrides;

    try {
        schema = reach(context.validationSchema, path);
    } catch (e: any) {
        schema = undefined;
    }

    if (schema) {
        if (isUndefined(label)) {
            label = schema.spec.label;
        }

        if (isUndefined(required)) {
            required = schema.spec.presence === 'required';
        }
    }

    return {
        error: (get(touched, path) && get(errors, path)) as string,
        value: get(context.values, path),
        common: {
            label,
            required,
        },
    };
}
