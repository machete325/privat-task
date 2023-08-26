/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { LinkedFormContext } from './LinkedForm';
import { BasicLinkedFieldProps, FormContext } from './types';
import { getLinkedMeta } from './utils';
import { inProgress } from '../utils';

export type LinkedTextFieldProps = BasicLinkedFieldProps & {
    disabled?: boolean;
    type: 'text' | 'email' | 'password';
    label?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<any>, context: FormContext<any>) => void;
};

const Label = styled.label`
    margin: 10px 0;
    display: block;
    color: gray;
    margin-bottom: 4px;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 14px;
    border-radius: 6px;
    -webkit-appearance: none;
    border: 1px solid #cdd9ed;
    transition: border 0.3s ease;
    outline: none;
    box-sizing: border-box;

    &::placeholder {
        color: #cbd1dc;
    }
    &:focus {
        outline: none;
        border-color: #275efe;
    }
`;

const ErrorText = styled.p`
    margin: 5px 0;
    color: red;
    font-size: 14px;
`;

export const LinkedTextField: React.FC<LinkedTextFieldProps> = (props) => {
    const { path, helperText, disabled, onChange, type, label, placeholder, ...others } = props;
    const contextValue = useContext(LinkedFormContext);
    const { error, value, common } = getLinkedMeta(contextValue, path, others);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, context: FormContext<any>) => {
        if (onChange) {
            onChange(e, context);
            return;
        }

        context.handleChange(e);
    };

    return (
        <div>
            <Label htmlFor={path}>{label || common.label}</Label>
            <div style={{ position: 'relative' }}>
                <Input
                    type={type}
                    name={path}
                    placeholder={placeholder || (common.label as string) || ''}
                    disabled={inProgress(contextValue.loading) ? true : disabled}
                    value={(value as string) || ''}
                    onChange={(e: any) => handleChange(e, contextValue)}
                />

                {(error || helperText) && <ErrorText>{error || helperText || ''}</ErrorText>}
            </div>
        </div>
    );
};
