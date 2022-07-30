import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// redux import
import { useDispatch, useSelector } from "react-redux";
import {
    setModelsLoaded,
    setGameFinish,
    setGamestart,
    setBestDone,
    setMyStream,
    setPeerNick,
    setReadyList,
    clearPeerNick,
    deletePeerNick,
    deleteReadyList,
} from "../../../modules/inGame";
import { updateVideos, deleteVideo, clearVideos } from "../../../modules/videos";

// face api import
import * as faceapi from 'face-api.js';

// constant value import
import { initialHP } from "./MyVideo";

const WebRTC = ({ socket, match }) => {
    const nickName = useSelector((state) => state.member.member.user_nick);
    const dispatch = useDispatch();
    const { roomID } = useParams();

    let otherUsers = useRef([])
    const userStream = useRef(); // 사용자의 stream
    const peerRef = useRef(); // peer 객체 생성에 사용하는 임시 변수
    const peers = useRef([]); // 다른 유저들의 peer들을 저장

    useEffect(() => {
        async function videoOn() {
            userStream.current =  await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            dispatch(setMyStream(userStream.current));
            getStream();
        }

        videoOn();

        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]).then(dispatch(setModelsLoaded(true)));

        return () => {
            // console.log("OUT ROOOOOOOOOM")
            socket.emit("out room");
            socket.off();
            socket.disconnect();
            userStream.current = null;
            otherUsers.current = [];
            peers.current = null;
            dispatch(clearPeerNick());
            dispatch(clearVideos());
            dispatch(setGameFinish(false));
            dispatch(setGamestart(false));
            dispatch(setBestDone(false));
        };
    }, [socket, match]);


    // 방 참가 & socket on
    const getStream = () => {
        socket.emit("join room", {
            roomID: roomID,
            streamID: userStream.current.id,
            nickName: nickName,
            initialHP: initialHP,
        });

        socket.emit("wait", ({ roomID: roomID }));

        socket.on("out user", ({ streamID }) => {
            dispatch(deleteVideo(streamID));
            dispatch(deleteReadyList(streamID));
            dispatch(deletePeerNick(streamID));
        });

        socket.on("other users", (usersID) => {
            usersID.forEach((userID) => {
                callUser(userID.socketID);
                dispatch(setPeerNick(userID.streamID, userID.nickName));
                dispatch(setReadyList(userID.streamID, userID.isReady));
                otherUsers.current.push(userID);
            });
        });

        socket.on("user joined", (userID) => {
            dispatch(setPeerNick(userID.streamID, userID.nickName));
            otherUsers = otherUsers.current.filter((info) => info.nickName !== userID.nickName);
            console.log(otherUsers)
            console.log(userID.nickName);
            otherUsers.current.forEach((info) => {
                console.log(info.nickName);
            })
            otherUsers.current.push(userID);
        });

        socket.on("offer", handleRecieveCall);
        socket.on("answer", handleAnswer);
        socket.on("ice-candidate", handleNewICECandidateMsg);
    };


    const callUser = (userID) => {
        try {
            peerRef.current = null; // 임시 변수 초기화
            peerRef.current = createPeer(userID); // 상대방의 userID를 파라미터로 넘기며(협상 위해) peer 객체를 생성
            userStream.current.getTracks().forEach((track) =>
                    peerRef.current.addTrack(track, userStream.current)
            );
            peers.current.push(peerRef.current);
        } catch (err) {
            console.error(err);
        }
    };


    // 나 자신의 peer 객체를 생성하는데 상대방(userID)와의 offer, answer작업에 대한 콜백 함수를 설정
    const createPeer = (userID) => {
        try {
            const peer = new RTCPeerConnection({
                iceServers: [{
                        urls: [
                            "stun:stun.stunprotocol.org",
                            "stun:stun.l.google.com:19302",
                            "stun:stun1.l.google.com:19302",
                            "stun:stun2.l.google.com:19302",
                            "stun:stun3.l.google.com:19302",
                            "stun:stun4.l.google.com:19302",
                            "stun:stun01.sipphone.com",
                            "stun:stun.ekiga.net",
                            "stun:stun.fwdnet.net",
                            "stun:stun.ideasip.com",
                            "stun:stun.iptel.org",
                            "stun:stun.rixtelecom.se",
                            "stun:stun.schlund.de",
                            "stun:stunserver.org",
                            "stun:stun.softjoys.com",
                            "stun:stun.voiparound.com",
                            "stun:stun.voipbuster.com",
                            "stun:stun.voipstunt.com",
                            "stun:stun.voxgratia.org",
                            "stun:stun.xten.com"
                        ], // stun 서버
                    }
                ],
            });
            
            // Ice Candidate 정보는 서로 주고 받음
            // Ice Candidate 이벤트가 발생하면 상대방에게 해당 정보를 전송
            peer.onicecandidate =     
            
            function (e) {
                if (e.candidate) {
                    const payload = {
                        caller: socket.id,
                        candidate: e.candidate,
                        roomID: roomID,
                    };
                    socket.emit("ice-candidate", payload);
                    console.log("ice-candidate")
                }
            };
            

            peer.ontrack =     
            function handleTrackEvent (e) {
                dispatch(updateVideos(e.streams[0])); // redux에 새로운 유저 video stream state를 update하는 함수 dispatch
            }; 

            peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID); // offer과 answer 작업

            return peer;

        } catch(e) {
            console.log(e)
        }

    };


    // Caller 입장에서 Offer을 제공(offer 이벤트를 emit)
    const handleNegotiationNeededEvent = async (userID) => {
        try {
            const index = otherUsers.current.findIndex(
                (otherUser) => otherUser.socketID === userID
            );
    
            const thePeer = peers.current[index];
            const offer = await thePeer.createOffer()
            console.log("create offer")
            thePeer.setLocalDescription(offer); // offer을 생성하고 해당 offer을 local description으로 설정
            console.log("offer : setLocal Description")
            const payload = {
                target: userID,
                caller: socket.id,
                sdp: offer,
            };
    
            socket.emit("offer", payload);
        } catch(e) {
            console.log(e);
        }
    };


    // Callee 입장에서 'offer' 이벤트를 listen했을 때
    const handleRecieveCall = async (incoming) => {
        try {
            peerRef.current = null;
            peerRef.current = createPeer(); // negotiate을 하는 Caller의 입장이 아니므로 상대방 userID를 보낼 필요 없음
            peers.current.push(peerRef.current);
            const maxNum = peers.current.length;
            const thePeer = peers.current[maxNum - 1];
            thePeer.setRemoteDescription(incoming.sdp)
            console.log("answer : set Remote Description")
            userStream.current.getTracks().forEach((track) =>
                thePeer.addTrack(track, userStream.current) // 상대방에게 나의 stream 정보를 answer하기 위해 peer에 track 정보추가
            );
            
            const answer = await thePeer.createAnswer();
            console.log("create answer")
            thePeer.setLocalDescription(answer); // offer와 유사하게 sdp 정보를 가지고 있음
            console.log("answer : set Local Description")
            const payload = {
                target: incoming.caller,
                caller: socket.id,
                sdp: answer,
            };
    
            socket.emit("answer", payload);
            console.log("send the answer")
        } catch (e) {
            console.log(e);
        }
    };


    // Caller 입장에서 Callee의 answer을 받았을 때
    const handleAnswer = (message) => {
        try {
            const index = otherUsers.current.findIndex((otherUser) => otherUser.socketID === message.caller);
            const thePeer = peers.current[index];
            thePeer.setRemoteDescription(message.sdp);
            console.log("offer : set Remote Description")
        } catch (err) {
            console.error(err);
        }
    };


    // Ice Candidate 정보는 서로 주고 받음
    // Ice Candidate 이벤트가 발생하면 상대방에게 해당 정보를 전송
    // const handleICECandidateEvent = (e) => {
    //     console.log(e)
    //     if (e.candidate) {
    //         const payload = {
    //             caller: socket.id,
    //             candidate: e.candidate,
    //             roomID: roomID,
    //         };
    //         socket.emit("ice-candidate", payload);
    //         console.log("ice-candidate")
    //     }
    // };


    // Ice Cnadidate 이벤트가 발생해서 상대방이 해당 정보를 전송하면, 그 정보를 받음
    const handleNewICECandidateMsg = (incoming) => {
        try {
             console.log("=============otherUsers=============")
             console.log(otherUsers)
             const index = otherUsers.current.findIndex((otherUser) => otherUser.socketID === incoming.caller);
             console.log("=============index=============")
             console.log(index)
             const thePeer = peers.current[index];
             console.log("=============thePeer=============")
             console.log(thePeer);
             thePeer.addIceCandidate(incoming.candidate);
             console.log("add IceCandidate")

           
        } catch (e) {
            console.log(e)
        }
    };

    // const handleTrackEvent = (e) => {
    //     dispatch(updateVideos(e.streams[0])); // redux에 새로운 유저 video stream state를 update하는 함수 dispatch
    // };
}

export default React.memo(WebRTC);