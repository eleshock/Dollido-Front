import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button3 from "../common/Button3.js";
import styled from "styled-components";
import * as faceapi from 'face-api.js';
import { useInterval } from "../common/usefulFuntions";
import { v4 as uuid } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import { setOnVideo } from "../../modules/makeRoomVideo";

import useSound from 'use-sound';

import {select, enterRoom} from './Sound'

// 방만들기 모달창

const Video = styled.video`
    display: block;
    margin: 0 auto;
    width: 450px;
    height: 340px;
    transform: scaleX(-1);
    border-radius:"10px";
`

const ModalContainer = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    fontFamily: "koverwatch",
};

const RoomModalHeader1 = {
    margin: "10px 0 5px 0",
    flex: "1",
    textAlign: "center",
    color: "white",
};

const RoomModalHeader2 = {
    margin: "0 0 0 0",
    flex: "1",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    color: "white",
};

const RoomModalHeaderRed = {
    margin: "0 0 0 0",
    flex: "1",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    color: "red",
};

const RoomModalMiddle = {
    flex: "8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const RoomModalBottom = {
    flex: "1",
    justifyContent: "center",
    display: "flex"
};

const sizes = {
    width: "42%",
    height: "36px",
    fontSize: "1rem",
    border: "1px solid transparent",
    margin: "0 20px 0 0",
};

const MakeRoomElement = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onVideo = useSelector((state) => state.makeRoomVideo.onVideo);

    const [enterGame] = useSound(
        enterRoom,
        { volume: 0.5 }
    );
    const [selectSound] = useSound(
        select,
        { volume: 0.5 }
    );

    /* 방 만들기 */
    const [roomName, setRoomName] = useState("");
    const roomNameRef = useRef(null);


    const handleVideoOnPlay = () => {
        dispatch(setOnVideo(true));
    }

    const onChangeRoomName = useCallback((e) => {
        setRoomName(e.target.value);
        localStorage.roomName = e.target.value;
    }, []);

    const onClickMakeRoom = useCallback(
    (e) => {
        e.preventDefault();
        // 2-1. 방제 없을 시, 생성 불가
        if (roomName === "") {
        alert("방 이름을 입력하세요");
        return;
        }
        const roomID = uuid();
        // console.log(roomID);
        localStorage.roomLink = roomID;
        // 2-3. 방 생성, 방이름과 방ID 서버에 전달
        props.socket.emit("make room", { roomName, roomID});
        alert(`${roomName} 방이 생성되었습니다`);
        setRoomName("");
        roomNameRef.current.value = "";
        navigate(`/room/${roomID}`);
    }, [roomName]);

    function handleHP(happiness, myHP) {
        if(myHP >0)
          if (happiness > 0.2) { // 피를 깎아야 하는 경우
            if (happiness > 0.6) {
                return 2;
            } else {
                return 1;
            }
        }
        return 0;
    }
    
    const faceDetectionOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 });
    const ShowStatus = () => {
    const [myHP, setMyHP] = useState(100);
    const [faceDetected, setFaceDetected]  = useState(false);
    const [smiling, setSmiling]  = useState(false);
    const [interval, setInterval] = useState(350);
    let content = "";

    useInterval(async () => {
        const detections = await faceapi.detectAllFaces(props.videoRef.current, faceDetectionOptions).withFaceExpressions();
        if (detections[0]) {
                const decrease = handleHP(detections[0].expressions.happy, myHP);
                if (decrease > 0) {
                    const newHP = myHP - decrease
                    if (newHP <= 0){ // game over
                        setInterval(null);
                    }
                    setMyHP(newHP);
                    setSmiling(true);
                } else setSmiling(false);
                setFaceDetected(true);
            } else {
                setFaceDetected(false)
                setSmiling(false);
            }
        }, interval);
        let detecContent = faceDetected ? "웃어 보세요!": "얼굴 인식이 되지 않았습니다.";
        if (faceDetected) {
            content = <h2 style={RoomModalHeader2} >{detecContent} </h2>
            if(smiling)
            content = <h2 style={RoomModalHeader2} > 웃음 인식 확인! </h2>
        } else {
            content = <h2 style={RoomModalHeaderRed}> {detecContent}</h2>
        }
        return content
    }

    return (
        <div style={ModalContainer}>
            <h1 style={RoomModalHeader1}>방만들기</h1>
            {!onVideo ? <h2 style={RoomModalHeader2}>model loading...</h2>: <ShowStatus ></ShowStatus>}
            <div style={RoomModalMiddle}>
                <Video ref={props.videoRef} onPlay = { handleVideoOnPlay }></Video>
            </div>
            <div style={RoomModalBottom}>
                <input
                    type="text"
                    placeholder="방이름을 입력하세요"
                    name="roomName"
                    value={roomName}
                    onChange={onChangeRoomName}
                    onKeyPress={(e) => {
                    e.key === "Enter" && onClickMakeRoom(e);
                    }}
                    ref={roomNameRef}
                    style={sizes}
                />
                <Button3
                    style={{margin : "0 0 20px 0", fontSize:"25px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center"}}
                    onMouseEnter = {selectSound}
                    onMouseUp = {enterGame}
                    onClick={onClickMakeRoom}
                >
                    방만들기
                </Button3>
            </div>
        </div>
    )
};

export default MakeRoomElement;