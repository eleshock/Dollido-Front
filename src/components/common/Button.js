import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
    text-align: center;
    color: rgb(245, 160, 40);
    display: block;
    position: relative;
    border: 2px solid rgb(245, 160, 40);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
    
    &:link, &:visited {
        position: relative;
        display: block;
        margin: 30px auto 0;
        padding: 14px 15px;
        color: #fff;
        font-size:14px;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;
        letter-spacing: .08em;
        border-radius: 0;
        text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
        -webkit-transition: all 1s ease;
        -moz-transition: all 1s ease;
        -o-transition: all 1s ease;
        transition: all 1s ease;
    }

    
    &:hover {
        color: #000 !important;
        background-color: transparent;
        text-shadow: ntwo;
    }
    
    &:hover:before {
        top: 0%;
        bottom: auto;
        height: 100%;
    }
    
    &:before {
        display: block;
        position: absolute;
        left: 0px;
        bottom: 0px;
        height: 0px;
        width: 100%;
        z-index: -1;
        content: '';
        color: #000 !important;
        background: #F7CA18;
        transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
    }
`;

function Button({ children, ...rest }) {
    return (
        <StyledButton {...rest}> {children} </StyledButton>
    );
};

export default Button;