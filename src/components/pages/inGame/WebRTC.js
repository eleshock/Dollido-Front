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
    const dispatch = useDispatch();
    const nickName = useSelector((state) => state.member.member.user_nick);
    const { roomID } = useParams();
    const userStream = useRef();
    const config = {iceServers: [{urls: "stun:stun.l.google.com:19302"}]};
    let peerList = useRef({});

    useEffect(() => {
        async function videoOn() {
            userStream.current = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
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
            socket.emit("out room");
            userStream.current = null;
            dispatch(clearPeerNick());
            dispatch(clearVideos());
            dispatch(setGameFinish(false));
            dispatch(setGamestart(false));
            dispatch(setBestDone(false));
        };
    }, [socket]);

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
        })

        socket.on("join room", async (userID)  => {
            const offer = await peerConnection(userID);
            socket.emit("offer", offer, userID, socket.id);
        });

        socket.on("setting", (streamID, isReady, nickName) => {
            dispatch(setPeerNick(streamID, nickName));
            dispatch(setReadyList(streamID, isReady));
        });

        socket.on("offer", async (socketID, offer) => {
            const answer = await peerConnection(socketID, offer);
            socket.emit("answer", answer, socketID, socket.id);
        });

        socket.on("answer", async (answer, socketID) => {
            try {
                peerList.current[socketID].setRemoteDescription(answer);
            } catch (e) {
                console.log(e);
            }
        });

        socket.on("ice-candidate", (candidate, userID) => {
            handleNewICECandidateMsg(candidate, userID);
        });
    }

    const peerConnection = async (userID, _offer) => {
        try {
            const peer = new RTCPeerConnection(config);
            
            peerList.current[userID] = peer;
            peer.addEventListener("icecandidate", (event) => handleIce(event, userID));
            peer.addEventListener("track", (event) => dispatch(updateVideos(event.streams[0])));
            
            userStream.current.getTracks().forEach((track) => {
                peer.addTrack(track, userStream.current);
            });

            return handleOfferAndAnswer(peer, _offer);
        } catch (e) {
            console.log(e);
        }
    }

    const handleIce = (event, userID) => {
        if (event.candidate) {
            const payload = {
                caller: socket.id,
                candidate: event.candidate,
                roomID: roomID,
                userID: userID
            }
            socket.emit("ice-candidate", payload);
            // console.log("icecandidate");
        }
    }

    const handleOfferAndAnswer = async (peer, _offer) => {
        // console.log("====================");
        let offer = _offer;
        let answer;
        try {
            if (!offer) {
                offer = await peer.createOffer();
                // console.log("createOffer");
                peer.setLocalDescription(offer);
                // console.log("setLocalDescription");
            } else {
                await peer.setRemoteDescription(offer);
                // console.log("setRemoteDescription");
                answer = await peer.createAnswer();
                // console.log("createAnswer");
                peer.setLocalDescription(answer);
                // console.log("setLocalDescription");
            }

            return answer || offer;
        } catch (e) {
            console.log(e);
        }

    }

    const handleNewICECandidateMsg = async (candidate, userID) => {
        try {
            if (candidate) {
                peerList.current[userID].addIceCandidate(candidate);
                console.log("addCandidate");
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default React.memo(WebRTC);