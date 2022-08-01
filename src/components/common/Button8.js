import React from 'react';
import styled, { css } from "styled-components";

const GameButton = styled.button`

    position: relative;
    top: 0;
    cursor: pointer;
    text-decoration: none !important;
    outline: none !important;
    font-family: CarterOne;
    font-size: 20px;
    line-height: 1.5em;
    letter-spacing: .1em;
    text-shadow: 2px 2px 1px #0066a2, -2px 2px 1px #0066a2, 2px -2px 1px #0066a2, -2px -2px 1px #0066a2, 0px 2px 1px #0066a2, 0px -2px 1px #0066a2, 0px 4px 1px #004a87, 2px 4px 1px #004a87, -2px 4px 1px  #004a87;
    border: none;
    margin: 15px 15px 30px;
    background: repeating-linear-gradient( 45deg, #3ebbf7, #3ebbf7 5px, #45b1f4 5px, #45b1f4 10px);
    border-bottom: 3px solid rgba(16, 91, 146, 0.5);
    border-top: 3px solid rgba(255,255,255,.3);
    color: #fff !important;
    border-radius: 8px;
    padding: 8px 15px 10px;
    box-shadow: 0 6px 0 #266b91, 0 8px 1px 1px rgba(0,0,0,.3), 0 10px 0 5px #12517d, 0 12px 0 5px #1a6b9a, 0 15px 0 5px #0c405e, 0 15px 1px 6px rgba(0,0,0,.3);

    &:hover {
        top:2px;
        box-shadow: 0 4px 0 #266b91, 0 6px 1px 1px rgba(0,0,0,.3), 0 8px 0 5px #12517d, 0 10px 0 5px #1a6b9a, 0 13px 0 5px #0c405e, 0 13px 1px 6px rgba(0,0,0,.3);
    }

    &::before{
        content: '';
        height: 10%;
        position: absolute;
        width: 40%;
        background: #fff;
        right: 13%;
        top: -3%;
        border-radius: 99px;
    }

    &::after{
        content: '';
        height: 10%;
        position: absolute;
        width: 5%;
        background: #fff;
        right: 5%;
        top: -3%;
        border-radius: 99px;
        
    }

`



function button8({children, ...rest}) {
  return (
    <div>
    <GameButton {...rest}>{children}</GameButton>
    </div>
    );
}

export default button8;