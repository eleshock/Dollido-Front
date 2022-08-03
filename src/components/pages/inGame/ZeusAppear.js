import styled, { keyframes } from "styled-components";
import React, { useRef } from "react";
import zeusImage from "../../../images/Zeus.png"
import { useSelector } from "react-redux";

const zeusMoveFrom = -850;
const zeusMoveTo = -500;

const zeusOn = keyframes`
    0% { bottom: ${zeusMoveFrom}px; }  
    100% { bottom: ${zeusMoveTo}px; }
`;

const zeusOff = keyframes`
    0% { bottom: ${zeusMoveTo}px; }  
    100% { bottom: ${zeusMoveFrom}px; }
`

const Zeus = styled.img`
    min-width: 650px;
    bottom: ${zeusMoveFrom}px;
    left: 0px;
    position: absolute;
    animation: ${(props) => {return props.zeusAppear ? zeusOn : zeusOff}} 3s linear forwards;
    `

const ZeusAppear = () => {
    const firstZeus = useRef(true);
    const zeusAppear = useSelector((state) => state.item.zeusAppear);
    if (zeusAppear) {
        firstZeus.current = false;
    }
    
    return (
        <>
            {!firstZeus.current && <Zeus src={zeusImage} zeusAppear={zeusAppear}></Zeus>}
        </>
    );
};

export default ZeusAppear;