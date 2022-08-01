import React from 'react';
import styled, { css } from "styled-components";


const GameButtonOrange = styled.button`


    position: relative;
    top: 0;
    cursor: pointer;
    text-decoration: none !important;
    outline: none !important;
    font-family: CarterOne;
    font-size: 20px;
    line-height: 1.5em;
    letter-spacing: .1em;
    text-shadow: 2px 2px 1px #e78700, -2px 2px 1px #e78700, 2px -2px 1px #e78700, -2px -2px 1px #e78700, 0px 2px 1px #e78700, 0px -2px 1px #e78700, 0px 4px 1px #c96100, 2px 4px 1px #c96100, -2px 4px 1px  #c96100;
    border: none;
    margin: 15px 15px 30px;
    background: repeating-linear-gradient( 45deg, #ffc800, #ffc800 5px, #ffc200 5px, #ffc200 10px);
    border-bottom: 3px solid rgba(205, 102, 0, 0.5);
    border-top: 3px solid rgba(255,255,255,.3);
    color: #fff !important;
    border-radius: 8px;
    padding: 8px 15px 10px;
    box-shadow: 0 6px 0 #b76113, 0 8px 1px 1px rgba(0,0,0,.3), 0 10px 0 5px #75421f, 0 12px 0 5px #8a542b, 0 15px 0 5px #593116, 0 15px 1px 6px rgba(0,0,0,.3);


    
    &:hover {
        top:2px;
        box-shadow: 0 4px 0 #b76113, 0 6px 1px 1px rgba(0,0,0,.3), 0 8px 0 5px #75421f, 0 10px 0 5px #8a542b, 0 13px 0 5px #593116, 0 13px 1px 6px rgba(0,0,0,.3);
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


function button9({children, ...rest}) {
  return (
    <div>
    <GameButtonOrange {...rest}>{children}</GameButtonOrange>
    </div>
    );
}

export default button9;