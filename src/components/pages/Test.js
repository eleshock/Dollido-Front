import io from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import * as faceapi from 'face-api.js';
const socket = io.connect("http://localhost:5000");


function Test() {

    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [captureVideo, setCaptureVideo] = useState(false);
    const [myHP, setHP] = useState(100);

    const videoRef = useRef();
    const videoHeight = 400;
    const videoWidth = 400;
    const canvasRef = useRef();
    let peerDict = {}; // 자신과 연결된 상대의 socket.id에 대한 hp Element 저장
    
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(setModelsLoaded(true));
        }
        loadModels();
        }, []);

    const startVideo = (deviceId) => {
        setCaptureVideo(true);
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: deviceId ? { deviceId } : true,
        }).then((stream) => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch ((err) => {
            console.log(err);
        });
    }

    function handleHP(happiness) {
        if (myHP > 0) { // 아직 살아 있으면
            if (happiness > 0.2) { // 피를 깎아야 하는 경우
                if (happiness > 0.6) {
                    setHP(myHP - 1);
                } else {
                    setHP(myHP - 0.5);
                }
            }
            // socket.emit("smile", myHP, room, socket.id);
        } else { // 죽었으면
            // socket.emit("gameOver", socket.id);
        }
    }

    
    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = { width: videoWidth, height: videoHeight }
                faceapi.matchDimensions(canvasRef.current, displaySize);
                
                const detections = faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
                console.log(videoRef.current)
                console.log(detections[0]);
                // if (detections) {
                    //     handleHP(detections[0].expressions.happy);
                    // }
            }
        }, 1000)
    }

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    }

    return ( 
        <div>
            <div style = { { textAlign: 'center', padding: '10px' } } > 
            { 
                captureVideo && modelsLoaded ?
                <button onClick = { closeWebcam } style = { { cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' } }>
                    Close Webcam 
                </button> 
                :
                <button onClick = { startVideo } style = { { cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' } }>
                    Open Webcam 
                </button>
            } 
        </div> 
        { 
            captureVideo ? 
                modelsLoaded ?
                    <div>
                        <div style = {{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                            <video ref = { videoRef } height = { videoHeight } width = { videoWidth } onPlay = { handleVideoOnPlay } style = { { borderRadius: '10px' } } /> 
                            <div>{myHP}</div>
                            <canvas ref = { canvasRef } style = { { position: 'absolute' } }/> 
                        </div> 
                    </div>
                    :
                    <div> loading... </div>
                :
                <>
                </>
            } 
        </div>
    );
}

export default Test;