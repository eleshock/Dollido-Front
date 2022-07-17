import React, { useEffect, useState, useRef } from "react";
import { useInterval } from '../common/usefulFuntions';
import * as faceapi from 'face-api.js';

const recordTime = 3000; // 녹화 시간(ms)
const modelInterval = 500; // 웃음 인식 간격(ms)
let startVideoPromise;
let recordedChunks = [];
let videoRecorded = false; // 녹화 여부

const stopWebcam = () => {
    startVideoPromise.then(stream => {
        console.log('Video Stopped');
        stream.getTracks().forEach(track => {
            track.stop();
        });
    });
}

/** 게임이 끝났을 때, 다음 판을 위해 변수 초기화*/
function gameFinished() {
    recordedChunks = [];
    videoRecorded = false;
}

function MyVideo(props) {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [onVideo, setOnVideo] = useState(false);
    const videoRef = useRef();
    const defaultPlayerId = "깨랑까랑";
    
    useEffect(() => gameFinished, []); // MyVideo component가 unmount됐을 때 실행

    const startVideo = (deviceId) => {
        startVideoPromise = navigator.mediaDevices.getUserMedia({
            audio: false,
            video: deviceId ? { deviceId } : true,
        });
        
        startVideoPromise.then((stream) => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch ((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        const videoNModelInit = async () => {
            startVideo();
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            console.log("AI Model Loading...")
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(setModelsLoaded(true));
        }
        videoNModelInit();
    }, []);
    
    function recordVideo(stream) {
        console.log("Start Recording...")
        let recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => { recordedChunks.push(event.data); }
        recorder.start();
        setTimeout(() => {
            recorder.stop();
            console.log("Recording Finished!");
        }, recordTime);
    }   

    function handleHP(happiness) {
        if (happiness > 0.2) { // 피를 깎아야 하는 경우
            if (happiness > 0.6) {
                if(!videoRecorded){ // 딱 한 번만 record
                    videoRecorded = true;
                    recordVideo(videoRef.current.srcObject);
                }
                return 2;
            } else {
                return 1;
            }
        }
        return 0;
    }
    
    const handleVideoOnPlay = () => {
        setOnVideo(true);
    }

    const ShowStatus = () => {
        const [myHP, setMyHP] = useState(100);
        const [faceDetected, setFaceDetected]  = useState(false);
        const [smiling, setSmiling]  = useState(false);
        const [interval, setInterval] = useState(modelInterval);
        let content = "";

        /** 모델 돌리기 + 체력 깎기 */
        useInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
            if (detections[0]) {
                const decrease = handleHP(detections[0].expressions.happy);
                if (decrease > 0) {
                    const newHP = myHP - decrease;
                    if (newHP <= 0){ // game over
                        setInterval(null);
                    }
                    setMyHP(newHP);
                    setSmiling(true);
                } else setSmiling(false);
                setFaceDetected(true);
            } else {
                setFaceDetected(false);
                setSmiling(false);
            }
        }, interval);

        let detecContent = faceDetected?"인식 중":"인식 불가";
        
        if (interval) {
            content = <h2>{detecContent}  HP : {myHP} {smiling&&"^^"}</h2>
        } else {
            content = <h2> Game Over!!! </h2>
        }
        
        return content
    }

    return ( 
        <>
            {
                modelsLoaded ?
                // <div style={{ backgroundColor: 'orange' }}>
                //     <h2 style={{ color: 'gray' }}>{props.playerId}</h2>
                //     <video autoPlay height={300} style={{ backgroundColor: 'white', width: 400 }}></video>
                //     <h2>HP : 100</h2>
                // </div>

                // <div style = {{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <div style={{ backgroundColor: 'moccasin' , margin:'0px 0 20px 0'}}>
                    <h2 style={{ color: 'gray' }}>{props.playerId ? props.playerId:defaultPlayerId}</h2>
                    <video ref = { videoRef } onPlay = { handleVideoOnPlay } style = { { borderRadius: '10px', width:"100%", transform:'scaleX(-1)' } } /> 
                    {!onVideo ? <div>model loading...</div>: <ShowStatus></ShowStatus>}
                </div> 
                :
                <div>
                    <h1> 입장 중 </h1> 
                </div>
            } 
        </>
    );
}

export default MyVideo;
export {recordedChunks, stopWebcam};