import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Props {
    open: boolean;
    onClose: VoidFunction;
    children: React.ReactNode;
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1102;
`;

const ModalContainer = styled.div`
    position: absolute;
    padding: 20px;
    top: 50%;
    left: 50%;
    min-width: 380px;
    min-height: 100px;
    border-radius: 10px;
    background: white;
    transform: translate(-50%, -50%);
    z-index: 1001;
`;

export const Modal = ({ open, onClose, children }: Props) => {
    if (!open) return null;

    const modalRoot = document.getElementById('modal-root') as HTMLElement;
    if (!modalRoot) return null;

    const handleCloseOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).id === 'modal-overlay') {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <ModalOverlay id="modal-overlay" onClick={handleCloseOverlay}>
            <ModalContainer>{children}</ModalContainer>
        </ModalOverlay>,
        modalRoot
    );
};
