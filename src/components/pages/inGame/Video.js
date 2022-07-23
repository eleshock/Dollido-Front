import React, { useEffect, useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useInterval } from "../../common/usefulFuntions";
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

// ServerName import
import { ServerName } from "../../../serverName";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setModelsLoaded, setGameFinish, setGamestart } from "../../../modules/inGame";
import { updateVideos, deleteVideo, clearVideos } from "../../../modules/videos";

// face api import
import * as faceapi from 'face-api.js';

const Middle = styled.div`
    display: flex;
    flex: 80;
    width: 100%;
    font-family: koverwatch;
`

const MiddleLeft ={
    flex: "2.5",
    textAlign: "Center",
    display: "flex",
    flexDirection: "Column"
}

const MiddleRight ={
    flex: "2.5",
    textAlign: "Center",
    display: "flex",
    flexDirection: "Column"
}

const MyNickname={
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: 'White',
}

const MyVideo={
    flex:'5',
    width:"100%",
    borderRadius:"10%"
}

const playerBox ={
    flex: "5"
}

const defaultUserNick = "salmonsushi"; // 임시(temp)dd
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

    recorder.start();
    setTimeout(() => {
        recorder.stop();
        console.log("Recording Finished!");
    }, recordTime);
}

const Video = ({ stream }) => {
    const ref = useRef();
    useEffect(() => {
        ref.current.srcObject = stream;
    }, [stream]);
    return <video style={{width:"100%", borderRadius:"10%"}} autoPlay ref={ref} />;
};

const InGameVideo = ({ match, socket }) => {
    const dispatch = useDispatch();
    const inGameState = useSelector((state) => ({ state: state.inGame }));
    const gameFinished = inGameState.state.gameFinished;
    const gameStarted = inGameState.state.gameStarted;
    const modelsLoaded = inGameState.state.modelsLoaded;
    const { roomID } = useParams();
    
    const userVideo = useRef();
    const userStream = useRef(); // 사용자의 stream
    const partnerVideos = useSelector((state) => state.videos);
    const peerRef = useRef(); // peer 객체 생성에 사용하는 임시 변수
    const otherUsers = useRef([]); // 다른 유저들의 userID를 저장
    const peers = useRef([]); // 다른 유저들의 peer들을 저장
    const user_nick = useSelector((state) => {
        const nick = state.member.member.user_nick;
        return nick ? nick : defaultUserNick;
    });

    // model 적재
    useEffect(() => {
        async function videoOn() {
            await navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then(getStream)
            .catch((err) => console.error(err));
        }
        
        videoOn();

        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]).then(dispatch(setModelsLoaded(true)));

        return () => {
            socket.emit("out room");
            socket.off();
            async function videoOff() {
                if (userStream.current) {
                    await userStream.current.getTracks().forEach((track) => {
                        console.log(track);
                        track.stop();
                    });
                }
            }
            videoOff();
            userVideo.current = null;
            userStream.current = null;
            otherUsers.current = null;
            peers.current = null;
            dispatch(clearVideos());
            deleteBestVideo(user_nick);
            dispatch(setGameFinish(false));
            dispatch(setGamestart(false));
        };
    }, [socket, match]);
    
    // 방 참가 & socket on
    const getStream = useCallback((stream) => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;
            socket.emit("join room", {
                roomID: roomID,
                streamID: stream.id,
                nickName: localStorage.nickname,
            });

            socket.emit("wait", ({ roomID: roomID }));
            
            socket.on("out user", ({ nickname, streamID }) => {
                console.log(nickname);
                dispatch(deleteVideo(streamID));
            });
            
            // 새로 들어간 사람 입장에서 다른 사람 전부의 정보를 전해들음
            socket.on("other users", (usersID) => {
                usersID.forEach((userID) => {
                    // userID들은 이미 존재하던 사람들. 그 사람들에게 call
                    callUser(userID.socketID);
                    otherUsers.current.push(userID);
                });
            });

            // 기존 사람들 입장에서 다른 유저가 들어왔음을 확인
            socket.on("user joined", (userID) => {
                otherUsers.current.push(userID);
            });

            // Callee는 Caller의 offer을 들을 것
            socket.on("offer", handleRecieveCall);

            socket.on("answer", handleAnswer);

            // IceCandidate 정보를 서로 주고 받음
            socket.on("ice-candidate", handleNewICECandidateMsg);
    }, [socket, match]);
    
    const callUser = useCallback((userID) => {
        try {
            peerRef.current = null; // 임시 변수 초기화
            peerRef.current = createPeer(userID); // 상대방의 userID를 파라미터로 넘기며(협상 위해) peer 객체를 생성
            userStream.current // 상대방에게 offer하기 위해서 stream 정보를 peer의 track에 추가
                .getTracks()
                .forEach((track) =>
                    peerRef.current.addTrack(track, userStream.current)
                );
            peers.current.push(peerRef.current);
        } catch (err) {
            console.error(err);
        }
    }, [socket, match]);
    
    // 나 자신의 peer 객체를 생성하는데 상대방(userID)와의 offer, answer작업에 대한 콜백 함수를 설정
    const createPeer = useCallback((userID) => {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org", // stun 서버
                },
                {
                    urls: "turn:numb.viagenie.ca", // turn 서버
                    credential: "muazkh",
                    username: "webrtc@live.com",
                },
            ],
        });

        peer.onicecandidate = handleICECandidateEvent; // Ice Candidate 이벤트 발생시 정보 전송
        peer.ontrack = handleTrackEvent; // 상대방의 stream을 track에 추가
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID); // offer과 answer 작업

        return peer;
    }, [socket, match]);

      // Caller 입장에서 Offer을 제공(offer 이벤트를 emit)
    const handleNegotiationNeededEvent = useCallback((userID) => {
        const index = otherUsers.current.findIndex(
            (otherUser) => otherUser.socketID === userID
        );
        
        const thePeer = peers.current[index];
        thePeer
            .createOffer()
            .then((offer) => {
                return thePeer.setLocalDescription(offer); // offer을 생성하고 해당 offer을 local description으로 설정
            })
            .then(() => {
                const payload = {
                    target: userID,
                    caller: socket.id,
                    sdp: thePeer.localDescription,
                };

                socket.emit("offer", payload);
            })
            .catch((err) => console.error(err));
    }, [socket, match]);

      // Callee 입장에서 'offer' 이벤트를 listen했을 때
    const handleRecieveCall = useCallback((incoming) => {
        peerRef.current = null;
        peerRef.current = createPeer(); // negotiate을 하는 Caller의 입장이 아니므로 상대방 userID를 보낼 필요 없음
        peers.current.push(peerRef.current);
        const maxNum = peers.current.length;
        const thePeer = peers.current[maxNum - 1];
        const desc = new RTCSessionDescription(incoming.sdp);
        thePeer
            .setRemoteDescription(desc)
            .then(() => {
                userStream.current.getTracks().forEach((track) => 
                    thePeer.addTrack(track, userStream.current) // 상대방에게 나의 stream 정보를 answer하기 위해 peer에 track 정보추가
                );
            })
            .then(() => {
                return thePeer.createAnswer();
            })
            .then((answer) => {
                return thePeer.setLocalDescription(answer); // offer와 유사하게 sdp 정보를 가지고 있음
            })
            .then(() => {
                const payload = {
                    target: incoming.caller,
                    caller: socket.id,
                    sdp: thePeer.localDescription,
                };

                socket.emit("answer", payload);
            })
            .catch((err) => console.error(err));
    }, [socket, match]);

    // Caller 입장에서 Callee의 answer을 받았을 때
    const handleAnswer = useCallback((message) => {
        try {
            const desc = new RTCSessionDescription(message.sdp);
            const index = otherUsers.current.findIndex((otherUser) => 
                otherUser.socketID === message.caller
            );
            const thePeer = peers.current[index];
            thePeer.setRemoteDescription(desc).catch((e) => console.log(e));
        } catch (err) {
            console.error(err);
        }
        }, [socket, match]);

    // Ice Candidate 정보는 서로 주고 받음
    // Ice Candidate 이벤트가 발생하면 상대방에게 해당 정보를 전송
    const handleICECandidateEvent = useCallback((e) => {
        if (e.candidate) {
            const payload = {
                caller: socket.id,
                candidate: e.candidate,
                roomID: roomID,
            };
            
            socket.emit("ice-candidate", payload);
        }
        }, [socket, match]);

    // Ice Cnadidate 이벤트가 발생해서 상대방이 해당 정보를 전송하면, 그 정보를 받음
    const handleNewICECandidateMsg = useCallback((incoming) => {
        const candidate = new RTCIceCandidate(incoming.candidate);
        const index = otherUsers.current.findIndex((otherUser) => 
            otherUser.socketID === incoming.caller
        );
        const thePeer = peers.current[index];
        thePeer
            .addIceCandidate(candidate)
            .catch((e) => console.log("ICE 에러\n" + e));

        }, [socket, match]);

    const handleTrackEvent = useCallback((e) => {
        dispatch(updateVideos(e.streams[0])); // redux에 새로운 유저 video stream state를 update하는 함수 dispatch
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

    const OthersShowStatus = ({ nickname }) => {
        const [peersHP, setPeersHP] = useState(100);
        useEffect(() => {
            socket.on("smile", (peerHP, peerID) => {
                if (nickname === peerID) {
                    setPeersHP(peerHP);
                }
            }
        )}, [nickname])

        return <ProgressBar striped variant="danger" now={peersHP} />
    }

    const ShowStatus = () => {
        const [myHP, setMyHP] = useState(100);
        const [faceDetected, setFaceDetected] = useState(false);
        const [smiling, setSmiling] = useState(false);
        const [interval, setInterval] = useState(modelInterval);
        let content = "";

        /** 모델 돌리기 + 체력 깎기 */
        useInterval(async () => {
            const detections = await faceapi.detectAllFaces(userVideo.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
            if (detections[0]) {
                const decrease = handleHP(detections[0].expressions.happy);
                
                if (decrease > 0) {
                    const newHP = myHP - decrease;
                    if (newHP <= 0) { // game over
                        socket.emit("finish", {roomID : roomID});
                        setInterval(null);
                    }
                    setMyHP(newHP);
                    socket.emit("smile", newHP, roomID, localStorage.getItem("nickname"));
                    setSmiling(true);
                } else {
                    setSmiling(false);
                }

                setFaceDetected(true);
            } else {
                setFaceDetected(false);
                setSmiling(false);
            }
        }, interval);

        if (interval) {
            content = <ProgressBar striped variant="danger" now={myHP} />
        } else {
            content = <h2 style={{color: "gray"}}> Game Over!!! </h2>
        }

        return content;
    }

    return (
        <Middle>
            <div style={MiddleLeft}>
                <div style={playerBox}>
                    <h1 style={MyNickname}>{localStorage.nickname}</h1>
                    <video autoPlay style={MyVideo} ref={userVideo} />
                    {modelsLoaded ? <ShowStatus></ShowStatus> : <h1> Model Loading... </h1>}
                </div>
                <div style={playerBox}>
                    {otherUsers.current[1] ? <h1 style={{color:"white"}}> {otherUsers.current[1].nickName}</h1> : <h1>{"Undefined"}</h1>}
                    <Video stream={partnerVideos[1]}></Video>
                    <OthersShowStatus nickname={otherUsers.current[1] ? otherUsers.current[1].nickName : "Undefined"}></OthersShowStatus>
                </div>
            </div>
            <div style={MiddleRight}>
                <div style={playerBox} >
                    {otherUsers.current[0] ? <h1 style={{color:"white"}}>{otherUsers.current[0].nickName}</h1> : <h1>{"Undefined"}</h1>}
                    <Video stream={partnerVideos[0]}></Video>
                    <OthersShowStatus nickname={otherUsers.current[0] ? otherUsers.current[0].nickName : "Undefined"}></OthersShowStatus>
                </div>
                <div style={playerBox} >
                    {otherUsers.current[2] ? <h1 style={{color:"white"}}> {otherUsers.current[2].nickName}</h1> : <h1>{"Undefined"}</h1>}
                    <Video stream={partnerVideos[2]}></Video>
                    <OthersShowStatus nickname={otherUsers.current[2] ? otherUsers.current[2].nickName : "Undefined"}></OthersShowStatus>
                </div>
            </div>
        </Middle>
    );
}

export default React.memo(InGameVideo);