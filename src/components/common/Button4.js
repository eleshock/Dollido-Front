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

const GameButtonBlue = styled.button`

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

const GameButtonRed = styled.button`

position: relative;
top: 0;
cursor: pointer;
text-decoration: none !important;
outline: none !important;
font-family: CarterOne;
font-size: 20px;
line-height: 1.5em;
letter-spacing: .1em;
text-shadow: 2px 2px 1px #d72d21, -2px 2px 1px #d72d21, 2px -2px 1px #d72d21, -2px -2px 1px #d72d21, 0px 2px 1px #d72d21, 0px -2px 1px #d72d21, 0px 4px 1px #930704, 2px 4px 1px #930704, -2px 4px 1px  #930704;
border: none;
margin: 15px 15px 30px;
background: repeating-linear-gradient( 45deg, #ff4f4c, #ff4f4c 5px, #ff4643 5px, #ff4643 10px);
border-bottom: 3px solid rgba(160, 25, 23, 0.5);
border-top: 3px solid rgba(255,255,255,.3);
color: #fff !important;
border-radius: 8px;
padding: 8px 15px 10px;
box-shadow: 0 6px 0 #ae2725, 0 8px 1px 1px rgba(0,0,0,.3), 0 10px 0 5px #831614, 0 12px 0 5px #a33634, 0 15px 0 5px #631716, 0 15px 1px 6px rgba(0,0,0,.3);

&:hover {
    top:2px;
    box-shadow: 0 4px 0 #ae2725, 0 6px 1px 1px rgba(0,0,0,.3), 0 8px 0 5px #831614, 0 10px 0 5px #a33634, 0 13px 0 5px #631716, 0 13px 1px 6px rgba(0,0,0,.3);
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

const GameButtonGreen = styled.button`

position: relative;
top: 0;
cursor: pointer;
text-decoration: none !important;
outline: none !important;
font-family: CarterOne;
font-size: 20px;
line-height: 1.5em;
letter-spacing: .1em;
text-shadow: 2px 2px 1px #348628, -2px 2px 1px #348628, 2px -2px 1px #348628, -2px -2px 1px #348628, 0px 2px 1px #348628, 0px -2px 1px #348628, 0px 4px 1px #1d4c16, 2px 4px 1px #1d4c16, -2px 4px 1px #1d4c16;
border: none;
margin: 15px 15px 30px;
background: repeating-linear-gradient( 45deg, #54d440, #54d440 5px, #52cc3f 5px, #52cc3f 10px);
border-bottom: 3px solid rgba(40, 117, 29, 0.5);
border-top: 3px solid rgba(255,255,255,.3);
color: #fff !important;
border-radius: 8px;
padding: 8px 15px 10px;
box-shadow: 0 6px 0 #348628, 0 8px 1px 1px rgba(0,0,0,.3), 0 10px 0 5px #2a6d20, 0 12px 0 5px #39822e, 0 15px 0 5px #1d4c16, 0 15px 1px 6px rgba(0,0,0,.3);

&:hover {
    top:2px;
    box-shadow: 0 4px 0 #348628, 0 6px 1px 1px rgba(0,0,0,.3), 0 8px 0 5px #2a6d20, 0 10px 0 5px #39822e, 0 13px 0 5px #1d4c16, 0 13px 1px 6px rgba(0,0,0,.3);
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

function GameButtonOranges({children, ...rest}) {
  return (
    <div>
    <GameButtonOrange {...rest}>{children}</GameButtonOrange>
    </div>
    );
}
function GameButtonBlues({children, ...rest}) {
    return (
      <div>
      <GameButtonBlue {...rest}>{children}</GameButtonBlue>
      </div>
      );
  }
  function GameButtonReds({children, ...rest}) {
    return (
      <div>
      <GameButtonRed {...rest}>{children}</GameButtonRed>
      </div>
      );
  }
  function GameButtonGreens({children, ...rest}) {
    return (
      <div>
      <GameButtonGreen {...rest}>{children}</GameButtonGreen>
      </div>
      );
  }
export {GameButtonOranges, GameButtonBlues, GameButtonReds, GameButtonGreens};