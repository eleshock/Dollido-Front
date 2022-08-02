import styled, { keyframes } from "styled-components";
import React, { useRef } from "react";
import Button from "../../common/Button.js";
import zeusImage from "../../../images/Zeus.png"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const zeusOn = keyframes`
    0% { bottom: -800px; }  
    100% { bottom: -250px; }
`;

const zeusOff = keyframes`
    0% { bottom: -250px; }  
    100% { bottom: -800px; }
`

const Word = styled.p`
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Black Han Sans";
    `

const Zeus = styled.img`
    min-width: 600px;
    bottom: -250px;
    left: -200px;
    position: absolute;
    animation: ${(props) => {return props.zeusAppear ? zeusOn : zeusOff}} 3s linear forwards;
    `


const handleZeusAppear = (socket, roomID) => {
    socket.emit("zeus_appear", roomID);
}

const handleZeusDisppear = (socket, roomID) => {
    socket.emit("zeus_disappear", roomID);
}


const ZeusAppear = ({ socket }) => {
    const firstZeus = useRef(true);
    const zeusAppear = useSelector((state) => state.item.zeusAppear);
    const { roomID } = useParams();
    if (zeusAppear) {
        firstZeus.current = false;
    }
    console.log(zeusAppear, firstZeus.current);
    
    return (
        <>
            {!firstZeus.current && <Zeus src={zeusImage} zeusAppear={zeusAppear}></Zeus>}
            <Button style={{ position: "absolute", bottom: "0%", left: "80%", transform: "translate(-50%, -50%)", width: "25rem", height: "7rem" }} onClick={() => handleZeusAppear(socket, roomID)} >
                <Word style={{ fontSize: "2rem" }}> Zeus ON </Word>
            </Button>
            <Button style={{ position: "absolute", bottom: "10%", left: "80%", transform: "translate(-50%, -50%)", width: "25rem", height: "7rem" }} onClick={() => handleZeusDisppear(socket, roomID)} >
                <Word style={{ fontSize: "2rem" }}> Zeus OFF </Word>
            </Button>
        </>
    );
};

export default ZeusAppear;