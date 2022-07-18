import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../../lib/styleUtill';

const Wrapper = styled.div`
    margin-top: 2rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;
    border-radius: 8px;

    background: #5f0080;
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: ${oc.teal[5]};
        ${shadow(0)}
    }

    &:active {
        background: ${oc.teal[7]};
    }

`;

const AuthButton = ({children, onClick}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
);

export default AuthButton;