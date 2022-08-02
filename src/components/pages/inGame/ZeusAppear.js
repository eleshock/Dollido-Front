import styled, { keyframes } from "styled-components";
import React, { useRef } from "react";
import Button from "../../common/Button.js";
import zeusImage from "../../../images/Zeus.png"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const zeusOn = keyframes`
    0% { bottom: -850px; }  
    100% { bottom: -250px; }
`;

const zeusOff = keyframes`
    0% { bottom: -250px; }  
    100% { bottom: -850px; }
`

const Zeus = styled.img`
    min-width: 650px;
    bottom: -250px;
    left: -75px;
    position: absolute;
    animation: ${(props) => {return props.zeusAppear ? zeusOn : zeusOff}} 3s linear forwards;
    `

const ZeusAppear = ({ socket }) => {
    const firstZeus = useRef(true);
    const zeusAppear = useSelector((state) => state.item.zeusAppear);
    const { roomID } = useParams();
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