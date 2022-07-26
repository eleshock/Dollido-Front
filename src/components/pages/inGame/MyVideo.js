import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useInterval } from "../../common/usefulFuntions";
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from "styled-components";
import effect from "../../../images/pepe-laugh-laugh.gif";

import 'bootstrap/dist/css/bootstrap.min.css';

// ServerName import
import { ServerName } from "../../../serverName";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setMineHP, setMyStream } from "../../../modules/inGame";

// face api import
import * as faceapi from 'face-api.js';

const Container = styled.div `
    flex: 13;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const NickName = styled.h2 `
    flex: 1;
    color: white;
`

const VideoStyle = styled.video `
    flex: 9;
    width: 270px;
    border-radius: 10%;
    justify-content: center;
    transform: scaleX(-1);
`

const HPContainer = styled.div `
    display: flex;
    width: 75%;
    color: white;
    flex: 1.5;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const HPContent = styled.div `
    width: 80%;
`

const recordTime = 3000; // 녹화 시간(ms)
const modelInterval = 500; // 웃음 인식 간격(ms)
const initialHP = 100;


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
    deleteBestVideo(user_nick); // 이전 비디오 삭제 요청
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



const MyVideo = ({ match, socket }) => {
    const dispatch = useDispatch();
    const inGameState = useSelector((state) => (state.inGame));
    const gameFinished = inGameState.gameFinished;
    const gameStarted = inGameState.gameStarted;
    const modelsLoaded = inGameState.modelsLoaded;
    const myStream = inGameState.myStream;
    const user_nick = useSelector((state) => state.member.member.user_nick);
    const chiefStream = inGameState.chiefStream;
    const readyList = inGameState.readyList;
    const mineHP = inGameState.myHP;

    const { roomID } = useParams();
    const userVideo = useRef();

    let videoRecorded = false; // 녹화 여부

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
            dispatch(setMineHP(null));
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
                return 10;
            } else {
                return 1;
            }
        }
        return 0;
    }


    const ShowStatus = () => {
        const [myHP, setMyHP] = useState(initialHP);
        const [interval, setModelInterval] = useState(gameFinished ? null : modelInterval);
        const [smiling, setSmiling] = useState(false);
        let content = "";

        /** 모델 돌리기 + 체력 깎기 */
        useInterval(async () => {
            // if(gameFinished) setModelInterval(null);
            if (myStream && myStream.id) {
                const detections = await faceapi.detectAllFaces(userVideo.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
                if (detections[0] && gameStarted) {
                    const decrease = handleHP(detections[0].expressions.happy);

                    if (decrease > 0) {
                        const newHP = myHP - decrease;
                        socket.emit("smile", newHP, roomID, user_nick, myStream.id);
                        if (newHP <= 0) { // game over
                            socket.emit("finish", { roomID: roomID });
                            setModelInterval(null);
                        }
                        setMyHP(newHP);
                        setSmiling(true);
                    } else {
                        setSmiling(false);
                    }
                } else {
                    setSmiling(false);
                }
            }
        }, interval);

        if (interval && smiling) {
            content =<>
            <img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"10%", left:"8%" }}></img>
            <ProgressBar striped variant="danger" now={myHP} />
            </>;
        } else if(interval && !smiling){
            content = <ProgressBar striped variant="danger" now={myHP} />
        } else {
            console.log(mineHP);
            content = <ProgressBar striped variant="danger" now={mineHP} />
        }

        useEffect(() => {
            socket.on("finish", (hpList) => {
              // HP [streamID, HP]
              if (myStream && myStream.id) {
                console.log(hpList)
                hpList.map((HP) => {
                    if (myStream.id === HP[0]){
                        console.log(myStream.id)
                        console.log(HP[0],":",HP[1])
                        if (HP[1] < 0) {
                            dispatch(setMineHP(0))
                            content = <ProgressBar striped variant="danger" now={mineHP} />
                        }else {
                            dispatch(setMineHP(HP[1]))
                            console.log(mineHP);
                            content = <ProgressBar striped variant="danger" now={mineHP} />
                        }
                    }
                })
              }
            });
          }, [socket])


        return content;
    }


    const ShowMyReady = () => {
        const [bool, setBool] = useState(false);
        useEffect(() => {
            if(myStream && myStream.id) {
                setBool(readyList[myStream.id]);
            }
        }, [readyList]);

        return (
            !gameStarted?
                myStream && myStream.id === chiefStream ?
                    <h2 style = {{color:"orange"}}>방장</h2> :
                    <h2 style = {{color: "white"}}>{bool ? "ready" : "not ready"}</h2> :
                    <h2 style = {{color:"white"}}>Playing</h2>
        )
    }

    return (
        <>
            <Container>
                <NickName style={MyNickname}>{user_nick}</NickName>
                <VideoStyle autoPlay ref={userVideo} />
            </Container>
            <HPContainer>
                <HPContent>
                    <ShowStatus></ShowStatus>
                </HPContent>
            </HPContainer>
            <ShowMyReady></ShowMyReady>
        </>
    );
}

export { initialHP };
export default MyVideo;