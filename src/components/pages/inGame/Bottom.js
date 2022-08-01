import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// commponent import
import Button8 from "../../common/Button8";
import Button9 from "../../common/Button9";
import Button7 from "../../common/Button7";
import { RedButtons, BlueButtons, YellowButtons } from "../../common/Button5";

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
    flex: '33',
    display: "flex",
    justifyContent: 'space-around',
    textAlign: "center",
    
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
        socket.emit("restart", {roomID: roomID});
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
            socket.emit("reverse", { roomID: roomID });
            dispatch(setGotReverse(false));

        }
    }

    return (
        <Bottom>
            {!gameStarted ?
                <div style={MyButton}>
                    {myStream && (chief || chiefStream === myStream.id) ?
                        <Button9 onClick={handleStart}>START</Button9>
                        :
                        <Button9 onClick={handleReady}>Ready</Button9>
                    }
                    <Link to="/Lobby">
                        <Button9 >QUIT</Button9>
                    </Link>

                </div>
                :
                <div style={{display: 'flex', flexDirection:"row", justifyContent:"space-between", alignItems: "center"}}>

                {!gameFinished &&
                (gotReverse ?
                    <div style={{margin:"0 80px 0 0"}}>
                    <RedButtons onClick={handleReverse}>R</RedButtons>
                    </div>
                   
                    :
                    <div style={{margin:"0 80px 0 0"}}>
                    <RedButtons style={{opacity:"0.3"}}>R</RedButtons>
                    </div>
        
                     )
            }
                {gameStarted && !gameFinished && !myWeaponUsingInThisGame &&
                   <div style={{display:"flex", flexDirection:"row"}}>
                   <div style={{margin:"0 80px 0 0"}}>
                   <BlueButtons onClick={handleNamanmoo} >W</BlueButtons>
                   </div>
                      <div style={MyButton}>
                      <YellowButtons >Y</YellowButtons>
                      </div>
                   </div> }   
                {gameStarted && !gameFinished && myWeaponUsingInThisGame &&
                <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{margin:"0 80px 0 0"}}>
                <BlueButtons onClick={handleNamanmoo} style={{opacity:"0.3"}} >W</BlueButtons>
                </div>
                   <div style={MyButton}>
                   <YellowButtons >Y</YellowButtons>
                   </div>
                </div>
                 }
              
                 </div>
            }
            
            {(gameFinished && bestDone) &&
                <div style={MyButton}>
                    {chief &&
                        <Button8 size="large" onClick={handleRestart}>RESTART</Button8>
                    }   
                        <Button9 size="large" onClick={handleQuit}>QUIT</Button9>
                </div>
            }
            <div style={{ opacity: '0', height: '6.5rem' }}> </div>
        </Bottom>
    );
}

export default InGameBottom;