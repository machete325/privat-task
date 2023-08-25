import styled from 'styled-components';

interface Props {
    $columns: number;
}

export const StyledTableContainerRemove = styled.div<Props>`
    display: grid;
    grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
    grid-gap: 2px;
    padding: 2px;
`;
