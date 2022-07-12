import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

import LoadGIF from "./Giftest";
import MyVideo from "./MyVideo";
import Button from "../common/Button.js";
import { Background } from "../common/Background.tsx"

import mainBackground from '../../images/main_background.png';

/** setInterval 안에서 setState 쓰려면 setInterval 대신에 이 함수 써야 함 */
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

/** 1초 줄어든 시간을 리턴 */
function decreaseOneSec(minutes, seconds) {
    if (seconds === 0) {
        seconds = 59;
        minutes -= 1;
    } else {
        seconds -= 1;
    }
    return [minutes, seconds];
}

function handleGameStart() {
    console.log("Game Start");
}

function Player(props) {
    return <div style={{ backgroundColor: 'orange' }}>
        <h2 style={{ color: 'gray' }}>{props.playerId}</h2>
        <video autoPlay height={300} style={{ backgroundColor: 'white', width: 400 }}></video>
        <h2>HP : 100</h2>
    </div>
}

function ChattingWindow(props) {
    return <div>
        <h1>Chatting Window Here</h1>
    </div>
}

function GifWindow(props) {
    return  <div>
                <h1>GIF Here</h1>
                <LoadGIF></LoadGIF>
            </div>
}


function Timer(props) {
    const gameMinutes = 1;
    const gameSeconds = 30;
    const [remainTime, setTimer] = useState([gameMinutes, gameSeconds]);
    const [minutes, seconds] = remainTime;

    let delay = 1000;
    let insertZero = '';
    let content = '';

    if (minutes === 0 && seconds === 0) { // 종료 조건
        content = <h1> Game Over! </h1>
        delay = null; // clear useInterval
    } else {
        if (seconds < 10) insertZero = '0';
        content = <h1> {'0' + remainTime[0] + ":" + insertZero + remainTime[1]} </h1>
    }

    useInterval(() => {
        setTimer(decreaseOneSec(remainTime[0], remainTime[1]));
    }, delay);

    return content;
}

const InGame = () => {

    const [gameStarted, setGameStart] = useState(false);

    const hColumnStyle = {
        width: "25%",
        float: "left",
        height: 80,
        padding: 10,
        textAlign: 'center'
    }

    const hMiddleStyle = {
        width: "50%",
        float: "left",
        height: 80,
        padding: 10,
        backgroundColor: 'coral',
        textAlign: 'center'
    }

    const columnStyle = {
        width: "25%",
        float: "left",
        height: 700,
        padding: 10,
        textAlign: 'center'
    }

    const middleStyle = {
        width: "50%",
        float: "left",
        height: 730,
        padding: 10,
        backgroundColor: 'pink',
        textAlign: 'center'
    }

    function handleStart(event) {
        setGameStart(!gameStarted);
        handleGameStart();
    }

    return (
        <ThemeProvider
            theme={{
                palette: {
                    yellow: "#E5B941"
                }
            }}>
            <Background
                background={mainBackground}
                element={
                    <div>
                        <header style={{ backgroundColor: 'green', height: 80 }}>
                            <div>
                                <div className="left" style={hColumnStyle}>
                                    <h1> Room Name </h1>
                                </div>
                                <div className="middle" style={hMiddleStyle}>
                                    {!gameStarted ? <h1>DOLLIDO</h1> : <Timer></Timer>}
                                </div>
                                <div className="right" style={hColumnStyle}>
                                    <h1> Mode </h1>
                                </div>
                            </div>
                        </header>
                        <div className="left" style={columnStyle}>
                            <MyVideo playerId={'SalmonSushi'}></MyVideo>
                            <Player playerId={'DongDongBro'}></Player>
                        </div>
                        <div className="middle" style={middleStyle}>
                            {!gameStarted ? <ChattingWindow></ChattingWindow> : <GifWindow></GifWindow>}
                        </div>
                        <div className="right" style={columnStyle}>
                            <Player playerId={'EleShock'}></Player>
                            <Player playerId={'BonJukLove'}></Player>
                        </div>
                    </div>
                }>
            </Background>
            <Button color="yellow" size="large" style={{ position: "absolute", top: "88%", left: "33%" }} onClick={handleStart}>
                START
            </Button>
            <Link to="/roomList">
                <Button color="yellow" size="large" style={{ position: "absolute", top: "88%", left: "55%" }}>
                    QUIT
                </Button>
            </Link>
        </ThemeProvider>
    );
};

export default InGame;