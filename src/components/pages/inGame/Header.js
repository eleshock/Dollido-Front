import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dollidoLogo from "../../../images/DollidoLogo2.png";
import { useInterval } from "../../common/usefulFuntions";
import TimerCss from "../../common/timer.js";
import GameOver from "../../../images/GameOver.png";
import Goldenbelt from "../../../images/Goldenbelt.png";
import Goldenbelt2 from "../../../images/Goldenbelt2.png";

// redux import
import { useSelector } from "react-redux";

const Header = styled.div`
    display: flex;
    flex: 3;
    font-family: koverwatch;
`
const HeaderStyle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
`
const HeaderLeft = styled.div`
    flex: 2.5;
    text-align: center;
    color: white;
`
const HeaderMiddle = styled.div`
    flex: 5;
    color: white;
    width: 100%;
    display: flex;
    justify-content: center;
`

const HeaderRight = styled.div`
    flex: 2.5;
    text-align: center;
    color: white;
`

const Img = styled.img`
    height: 75px;
`
const TimerStyle = {
    margin: "0",
    display: "flex",
    alignItems: "center",
    fontSize: "60px"

}

const InGameHeader = ({socket}) => {
    const gameFinished = useSelector((state) => state.inGame.gameFinished);
    const gameStarted = useSelector((state) => state.inGame.gameStarted);
    const roomID = useSelector((state) => state.inGame.roomID);

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

    function Timer() {
        const gameMinutes = 1;
        const gameSeconds = 30;
        const [remainTime, setTimer] = useState([gameMinutes, gameSeconds]);
        const [minutes, seconds] = remainTime;

        let delay = 1000;
        let insertZero = '';
        let content = '';

        if (minutes === 0 && seconds === 0) { // 종료 조건
            content = <h1>Game Over !</h1>
            delay = null; // clear useInterval
            socket.emit("finish", ({roomID : roomID}));
        } else {
        if (seconds < 10) insertZero = '0';
            content = 
                
                
                <p style={TimerStyle}> {'0' + remainTime[0] + ":" + insertZero + remainTime[1]} </p>
            
        }

        useInterval(() => {
            setTimer(decreaseOneSec(remainTime[0], remainTime[1]));
        }, delay);

        return content;
    }

    return (
        <Header>
            <HeaderStyle>
                <HeaderLeft>
                    <h1 style={{margin:"0"}}>{localStorage.roomName}</h1>
                </HeaderLeft>
                <HeaderMiddle>
                    {!gameFinished?
                        !gameStarted ?
                            <Img src={dollidoLogo}/>
                            :
                            <>
                            <img src={Goldenbelt} flex="3" margin="0 0 0 0"/>
                            <Timer flex="4"></Timer>
                            <img src={Goldenbelt2} flex="3" margin="0 0 0 0"/>
                            </>
                        :
                        <img src={GameOver}/>
                    }
                </HeaderMiddle>
                <HeaderRight>
                <h1 style={{margin:"0"}}>개인전</h1>
                </HeaderRight>
            </HeaderStyle>
        </Header>
    );
}

export default InGameHeader;