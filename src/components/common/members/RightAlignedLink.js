import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Aligner = styled.div`
    margin-top: 1rem;
    margin-right: 0.3rem;
    text-align: right;
`;

const StyledLink = styled.div`
    color: ${oc.gray[6]};
    text-decoration: underline;

    &:hover {
        cursor: pointer;
        color: ${oc.gray[7]};
    }
`

const RightAlignedLink = ({onClick, children}) => (
    <Aligner>
        <StyledLink onClick={onClick}>{children}</StyledLink>
    </Aligner>
);

export default RightAlignedLink;