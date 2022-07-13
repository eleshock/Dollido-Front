import React, { useEffect, useState, useRef } from "react";
import * as faceapi from 'face-api.js';

function MyVideo(props) {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [videoStarted, setvideoStarted] = useState(true);
    const [onVideo, setOnVideo] = useState(false);

    const videoRef = useRef();
    const videoHeight = 300;
    const videoWidth = 400;
    const canvasRef = useRef();
    const defaultPlayerId = "깨랑까랑";


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
    
    const startVideo = (deviceId) => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
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
    
    
    function handleHP(happiness, myHP) {
        if (myHP > 0) { // 아직 살아 있으면
            if (happiness > 0.2) { // 피를 깎아야 하는 경우
                if (happiness > 0.6) {
                    return 2;
                } else {
                    return 1;
                }
            }
        } else { // 죽었으면
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
        const [interval, setInterval] = useState(350);
        let content = "";

        useInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
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

        let detecContent = faceDetected?"인식 중":"인식 불가";
        // detecContent = detecContent.padEnd(15-detecContent.length, '\u00A0');
        if (interval) {
            content = <h2>{detecContent}  HP : {myHP} {smiling&&"^^"}</h2>
        } else {
            content = <h2> Game Over!!! </h2>
        }
        
        return content
    }

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setvideoStarted(false);
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