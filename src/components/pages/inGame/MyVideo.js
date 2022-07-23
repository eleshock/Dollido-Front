import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useInterval } from "../../common/usefulFuntions";
import ProgressBar from 'react-bootstrap/ProgressBar';

import 'bootstrap/dist/css/bootstrap.min.css';

// ServerName import
import { ServerName } from "../../../serverName";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setMyStream } from "../../../modules/inGame";

// face api import
import * as faceapi from 'face-api.js';

const defaultUserNick = "salmonsushi"; // 임시(temp)
const recordTime = 3000; // 녹화 시간(ms)
const modelInterval = 500; // 웃음 인식 간격(ms)
let videoRecorded = false; // 녹화 여부


// 녹화가 완료된 후 서버로 비디오 데이터 post
async function postVideo(recordedBlob, user_nick) {
    const formdata = new FormData();

    formdata.append('user_nick', user_nick);
    formdata.append('video', recordedBlob, 'video.mp4');

    await axios.post(`${ServerName}/api/best/send-video`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((res) => {
            console.log('POST res : ', res)
        })
        .catch((err) => {
            console.log('err : ', err)
        });
}

/** 서버에 유저의 best perform 영상 삭제 요청  */
function deleteBestVideo(user_nick) {
    const data = {
        user_nick: user_nick
    };

    axios.post(`${ServerName}/api/best/delete-video`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
}


function recordVideo(stream, user_nick) {
    let recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
        const recordedBlob = new Blob([event.data], {
            type: "video/mp4"
        });
        postVideo(recordedBlob, user_nick);
    };
    console.log("Recording Start...");
    recorder.start();
    setTimeout(() => {
        recorder.stop();
        console.log("Recording Finished!");
    }, recordTime);
}

const MyNickname = {
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: 'White',
}

const MyVideoCSS = {
    flex: '5',
    width: "100%",
    borderRadius: "10%",
    transform: 'scaleX(-1)'
}


const MyVideo = ({ match, socket }) => {
    const dispatch = useDispatch();
    const inGameState = useSelector((state) => (state.inGame));
    const gameFinished = inGameState.gameFinished;
    const gameStarted = inGameState.gameStarted;
    const modelsLoaded = inGameState.modelsLoaded;
    const myStream = inGameState.myStream;
    const user_nick = useSelector((state) => {
        const nick = state.member.member.user_nick;
        return nick ? nick : defaultUserNick;
    });

    const { roomID } = useParams();
    const userVideo = useRef();

    useEffect(() => {
        if (modelsLoaded && myStream && myStream.id) {
            userVideo.current.srcObject = myStream;
        }
        return () => {
            async function videoOff() {
                if (myStream && myStream.id) {
                    await myStream.getTracks().forEach((track) => {
                        track.stop();
                    });
                }
            }
            videoOff();
        }
    }, [modelsLoaded, myStream])


    useEffect(() => {
        return () => {
            deleteBestVideo(user_nick);
            dispatch(setMyStream(null));
            videoRecorded = false;
            userVideo.current = null;
        }
    }, [socket, match]);


    function handleHP(happiness) {
        if (happiness > 0.2) { // 피를 깎아야 하는 경우
            if (happiness > 0.6) {
                if (!videoRecorded) { // 딱 한 번만 record
                    videoRecorded = true;
                    recordVideo(userVideo.current.srcObject, user_nick);
                }
                return 2;
            } else {
                return 1;
            }
        }
        return 0;
    }


    const ShowStatus = () => {
        const [myHP, setMyHP] = useState(100);
        const [interval, setModelInterval] = useState(modelInterval);
        let content = "";

        /** 모델 돌리기 + 체력 깎기 */
        useInterval(async () => {
            if (gameFinished) setModelInterval(null);
            if (myStream && myStream.id) {
                const detections = await faceapi.detectAllFaces(userVideo.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
                if (detections[0]) {
                    const decrease = handleHP(detections[0].expressions.happy);

                    if (decrease > 0) {
                        const newHP = myHP - decrease;
                        if (newHP <= 0) { // game over
                            socket.emit("finish", { roomID: roomID });
                            setModelInterval(null);
                        }
                        setMyHP(newHP);
                        socket.emit("smile", newHP, roomID, localStorage.getItem("nickname"), myStream.id);
                    }
                }
            }
        }, interval);

        if (interval) {
            content = <ProgressBar striped variant="danger" now={myHP} />
        } else {
            content = <h2 style={{ color: "gray" }}> Game Over!!! </h2>
        }

        return content;
    }


    return <div>
        <h1 style={MyNickname}>{localStorage.nickname}</h1>
        <video autoPlay style={MyVideoCSS} ref={userVideo} />
        <ShowStatus></ShowStatus>
    </div>

}

export default MyVideo;