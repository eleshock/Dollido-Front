import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// commponent import
import {GameButtonOranges, GameButtonBlues, GameButtonReds, GameButtonGreens } from "../../common/Button4";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setMineHP } from "../../../modules/inGame";
import { setIsMe, setMyWeapon, setMyWeaponCheck, setGotReverse } from '../../../modules/item';

import {celebrateSF} from "../Sound";

// icon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsSpin } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";


const Bottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: koverwatch;
`

const MyButton = {
    display: "flex",
    justifyContent: 'space-around',
    textAlign: "center",
    flex: 1
    
}

const ButtonSize = {
    fontSize: "18px",
    lineHeight: "45px",
    width: "150px",
    height: "45px",
    margin: "30px"
}

const buttonstyle ={

    backgroundColor: "transparent",
    backgroundRepeat: "noRepeat",
    border: "none",
    cursor:"pointer",
    overflow: "hidden",
    outline: "none"
}


const InGameBottom = ({ socket }) => {
    const dispatch = useDispatch();
    const inGameState = useSelector((state) => (state.inGame));
    const itemState = useSelector((state) => state.item);
    const chief = inGameState.chief;
    const chiefStream = inGameState.chiefStream;
    const myStream = inGameState.myStream;
    const gameStarted = inGameState.gameStarted;
    const gameFinished = inGameState.gameFinished;
    const bestDone = inGameState.bestDone;
    const roomID = inGameState.roomID;
    const reverse = useSelector((state) => (state.item.reverse))
    const gotReverse = useSelector((state) => (state.item.gotReverse))

    //id 전달
    const membersState = useSelector((state) => (state.member));
    const MyNickname = membersState.member.user_nick;
    const myGIF = membersState.user_gif;

    //my weapon useState
    const myWeaponUsing = itemState.myWeapon;
    const myWeaponUsingInThisGame = itemState.myWeaponCheck;


    const navigate = useNavigate();



    function handleReady() {
        socket.emit("ready", { roomID: roomID });
    }

    function handleStart() {
        socket.emit("start", { roomID: roomID });
    }



    function handleRestart() {
        socket.emit("restart", { roomID: roomID });
        dispatch(setMineHP(null));
    }

    function handleQuit() {
        celebrateSF.pause();
        navigate('/lobby');
    }

    function handleNamanmoo() {
        if (!myWeaponUsingInThisGame && !myWeaponUsing) {
            socket.emit("my_weapon", roomID, myGIF, MyNickname);
            dispatch(setIsMe(true));
            dispatch(setMyWeapon(true));
            dispatch(setMyWeaponCheck(true));
        }
    }

    function handleReverse() {
        if (!reverse) {
            socket.emit("reverse", { roomID: roomID, nickName: MyNickname });
            dispatch(setGotReverse(false));
        }
    }

    return (
        <Bottom>
            {!gameStarted ?
                <div style={MyButton}>
                    {myStream && (chief || chiefStream === myStream.id) ?
                        <div>
                        <GameButtonOranges onClick={handleStart}>START</GameButtonOranges>
                        </div>
                        :
                        <div>
                        <GameButtonOranges onClick={handleReady}>READY</GameButtonOranges>
                        </div>
                    }
                    <div>
                    <Link to="/Lobby">
                        <GameButtonOranges >QUIT</GameButtonOranges>
                    </Link>
                    </div>
                </div>
                :
                <div style={MyButton}>
                    {!gameFinished &&
                        (gotReverse ?
                        <div>
                            <GameButtonReds onClick={handleReverse} style={{fontFamily:"koverwatch"}} >리버스 모드</GameButtonReds>
                        </div>
                        :
                        <div>
                            <GameButtonReds style={{opacity:"0.3", fontFamily:"koverwatch"}}>리버스 모드</GameButtonReds>
                        </div>
                        )
                    }
                    {gameStarted && !gameFinished && !myWeaponUsingInThisGame &&
                    <GameButtonBlues onClick={handleNamanmoo} style={{fontFamily:"koverwatch"}}>나만의 무기</GameButtonBlues>
                    }   
                    {gameStarted && !gameFinished && myWeaponUsingInThisGame &&
                    <GameButtonBlues onClick={handleNamanmoo} style={{opacity:"0.3", fontFamily:"koverwatch"}} >나만의 무기</GameButtonBlues>
                    }
                </div>
            }
            
            {(gameFinished && bestDone) &&
                <div style={{ display: "flex", justifyContent: 'space-around', textAlign: "center", flex: "33"}}>
                    {chief &&
                        <GameButtonGreens size="large" onClick={handleRestart}>RESTART</GameButtonGreens>
                    }   
                        <GameButtonOranges size="large" onClick={handleQuit}>QUIT</GameButtonOranges>
                </div>
            }
            <div style={{ opacity: '0', height: '6.5rem' }}> </div>
        </Bottom>
    );
}

export default InGameBottom;