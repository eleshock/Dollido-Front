import React, { useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

// redux import
import { useDispatch, useSelector } from "react-redux";
import {
    setModelsLoaded,
    setGameFinish,
    setGamestart,
    setMyStream,
    setPeerNick,
    clearPeerNick,
    deletePeerNick,
    deleteReadyList
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

    const otherUsers = useRef([])
    const userStream = useRef(); // 사용자의 stream
    const peerRef = useRef(); // peer 객체 생성에 사용하는 임시 변수
    const peers = useRef([]); // 다른 유저들의 peer들을 저장
    let nick = useSelector((state) => state.inGame.peerNick);

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
            userStream.current = null;
            otherUsers.current = null;
            peers.current = null;
            dispatch(clearPeerNick());
            dispatch(clearVideos());
            dispatch(setGameFinish(false));
            dispatch(setGamestart(false));
        };
    }, [socket, match]);


    // 방 참가 & socket on
    const getStream = useCallback((stream) => {
        dispatch(setMyStream(stream));
        userStream.current = stream;
        socket.emit("join room", {
            roomID: roomID,
            streamID: stream.id,
            nickName: nickName,
            initialHP : initialHP,
        });

        socket.emit("wait", ({ roomID: roomID }));

        socket.on("out user", ({ streamID }) => {
            dispatch(deleteVideo(streamID));
            dispatch(deleteReadyList(streamID));
            dispatch(deletePeerNick(streamID));
        });

        // 새로 들어간 사람 입장에서 다른 사람 전부의 정보를 전해들음
        socket.on("other users", (usersID) => {
            usersID.forEach((userID) => {
                // userID들은 이미 존재하던 사람들. 그 사람들에게 call
                callUser(userID.socketID);
                dispatch(setPeerNick(userID.streamID, userID.nickName));
                otherUsers.current.push(userID);
            });
        });

        // 기존 사람들 입장에서 다른 유저가 들어왔음을 확인
        socket.on("user joined", (userID) => {
            dispatch(setPeerNick(userID.streamID, userID.nickName));
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

}

export default React.memo(WebRTC);