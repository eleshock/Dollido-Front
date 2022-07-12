import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';
import axios from "axios";

import Button from "../common/Button.js";
import { Background } from "../common/Background.tsx"

import mainBackground from '../../images/main_background.png';
import sana from '../../images/sana.gif';

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

function decreaseOneSec(minutes, seconds){
    if (seconds === 0){
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
    return <div>
        <h1>GIF Here</h1>
        <img src={sana} style={{width:'inherit'}}></img>
    </div>
}

function Timer(props) {
    const gameMinutes = 1;
    const gameSeconds = 30;
    const [remainTime, setTimer] = useState([gameMinutes, gameSeconds]);
    
    useInterval(() => {
        setTimer(decreaseOneSec(remainTime[0], remainTime[1]));
    }, 1000);

    const [minutes, seconds] = remainTime;
    let insertZero = '';

    if (seconds < 10) {
        insertZero = '0';
    }

    return <h1> {'0' + remainTime[0] + ":" + insertZero + remainTime[1]} </h1>
}

const InGame = () => {
    
    const [gameStarted, setGameStart] = useState(false);

    const hColumnStyle = {
        width: "25%",
        float: "left",
        height: 80,
        padding: 10
    }

    const hMiddleStyle = {
        width: "50%",
        float: "left",
        height: 80,
        padding: 10,
        backgroundColor: 'coral'
    }

    const columnStyle = {
        width: "25%",
        float: "left",
        height: 700,
        padding: 10
    }

    const middleStyle = {
        width: "50%",
        float: "left",
        height: 730,
        padding: 10,
        backgroundColor: 'pink'
    }

    function handleTemp(event) {
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
            <header style={{ backgroundColor: 'green', height: 80 }}>
                <div>
                    <div className="left" style={hColumnStyle}>
                        <h1> Room Name </h1>
                    </div>
                    <div className="middle" style={hMiddleStyle}>
                            {!gameStarted && (
                                <h1>DOLLIDO</h1>
                            )}
                            {gameStarted && (
                                <Timer></Timer>
                            )}                    </div>
                    <div className="right" style={hColumnStyle}>
                        <h1> Mode </h1>
                    </div>
                </div>
                <h1 style={{ color: "#E5B941" }}>This is In Game Page</h1>
            </header>
            <Background
                background={mainBackground}
                element={
                    <div>
                        <div className="left" style={columnStyle}>
                            <Player playerId={'SalmonSushi'}></Player>
                            <Player playerId={'DongDongBro'}></Player>
                        </div>
                        <div className="middle" style={middleStyle}>
                            {!gameStarted && (
                                <ChattingWindow></ChattingWindow>
                            )}
                            {gameStarted && (
                                <GifWindow></GifWindow>
                            )}
                        </div>
                        <div className="right" style={columnStyle}>
                            <Player playerId={'EleShock'}></Player>
                            <Player playerId={'BonJukLove'}></Player>
                        </div>
                    </div>
                }>
            </Background>
                <Button color="yellow" size="large" style={{ position: "absolute", top: "88%", left: "33%" }} onClick={handleTemp}>
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