import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const LoaderContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const LoaderSpinner = styled.div`
    width: 48px;
    height: 48px;
    border: 4px solid blue;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
`;

export const Loader = () => {
    return (
        <LoaderContainer>
            <LoaderSpinner />
        </LoaderContainer>
    );
};
