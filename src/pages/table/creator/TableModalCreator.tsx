import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Modal } from '../../../common/components/common/Modal';
import { LinkedForm, LinkedFormProps } from '../../../common/form/LinkedForm';

interface Props<T> extends LinkedFormProps<T> {
    open: boolean;
    title: React.ReactNode;
    description?: React.ReactNode;
    onClose: VoidFunction;
    submitActionTitle?: React.ReactNode;
    cancelActionTitle?: React.ReactNode;
    children: React.ReactNode;
}

const Title = styled.div`
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
    opacity: 0.8;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;

const SubmitButton = styled.button`
    padding: 6px 10px;
    min-width: 100px;
    height: 35px;
    background: #038914;
    color: white;
    border: 0;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
`;

const CancelButton = styled.button`
    padding: 6px 10px;
    min-width: 100px;
    height: 35px;
    background: crimson;
    color: white;
    border: 0;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
`;

export const BaseCreator: <T>(props: Props<T>) => ReactElement<Props<T>> = (props) => {
    const {
        open,
        title,
        onClose,
        submitActionTitle = 'Save',
        cancelActionTitle = 'Cancel',
        children,
        ...others
    } = props;

    return (
        <Modal open={open} onClose={onClose}>
            <LinkedForm {...others}>
                <Title>{title}</Title>

                {children}
                <ButtonContainer>
                    <CancelButton type="button" onClick={onClose}>
                        {cancelActionTitle}
                    </CancelButton>

                    <SubmitButton type="submit">{submitActionTitle}</SubmitButton>
                </ButtonContainer>
            </LinkedForm>
        </Modal>
    );
};
