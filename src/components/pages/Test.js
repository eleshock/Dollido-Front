import React, { useEffect, useState, useRef } from "react";
import * as faceapi from 'face-api.js';

function Test() {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [captureVideo, setCaptureVideo] = useState(false);
    const [onVideo, setOnVideo] = useState(false);

    const videoRef = useRef();
    const videoHeight = 400;
    const videoWidth = 400;
    const canvasRef = useRef();

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
    
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

    function handleHP(happiness, myHP) {
        if (myHP > 0) { // 아직 살아 있으면
            if (happiness > 0.2) { // 피를 깎아야 하는 경우
                if (happiness > 0.6) {
                    return 1;
                } else {
                    return 0.5;
                }
            }
        } else { // 죽었으면
        }
        return 0;
    }
    
    const handleVideoOnPlay = () => {
        setOnVideo(true);
    }
    
    const ShowHP = () => {
        const [myHP, setMyHP] = useState(100);
        useInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
            if (detections[0]) {
                const decrease = handleHP(detections[0].expressions.happy, myHP);
                setMyHP(myHP - decrease);
            }
        }, 1000);
        return <div>{myHP}</div>
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
                            {!onVideo ? <div>model loading...</div>: <ShowHP></ShowHP>}
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