import React from 'react';
import styled, { css } from "styled-components";

const StyledButton = styled.button`

    display:inline-block;
    min-width:150px;
    line-height:65px;
    padding:0px 3px;
    border:3px solid transparent;
    background-color: #f38703;
    box-shadow: 0px 0px 3px #469ed7;
    border-radius:5px;
    -webkit-appearance:none;
    opacity:0.8;
    
    font-family:koverwatch;
    text-transform:uppercase;
    font-size:40px;
    color:white;
    text-shadow:0px 0px 2px white;
    
    transition: opacity 0.2s ease-out, border 0.2s ease-out;
    
  
    &:hover {
        opacity:1;
        border:3px solid white;
    }

`


function button7({children, ...rest}) {
  return (

    <StyledButton {...rest}> {children} </StyledButton>
    );
}

export default button7;