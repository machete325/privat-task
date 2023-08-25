import styled from 'styled-components';

interface Props {
    $columns: number;
}

export const StyledTableContainer = styled.div<Props>`
    padding: 2px;
    display: grid;
    grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
    grid-gap: 2px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;
