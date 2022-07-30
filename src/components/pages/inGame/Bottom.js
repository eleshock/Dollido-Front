import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// commponent import
import Button from "../../common/Button";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setMineHP } from "../../../modules/inGame";
import { setIsMe, setMyWeapon, setMyWeaponCheck, setGotReverse } from '../../../modules/item';

import {celebrateSF} from "../Sound";

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-family: koverwatch;
`
const MyButton = {
    flex: '3',
    display: "flex",
    justifyContent: 'center',
    textAlign: "center",
    alignItems: 'center'
}

const ButtonSize = {
    fontSize: "18px",
    lineHeight: "45px",
    width: "150px",
    height: "45px",
    margin: "30px"
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
                        <Button color="yellow" size="large" style={ButtonSize} onClick={handleStart}>START</Button>
                        :
                        <Button color="yellow" size="large" style={ButtonSize} onClick={handleReady}>Ready</Button>
                    }
                    <Link to="/Lobby" style = {{textDecoration:"none"}}>
                        <Button color="yellow" size="large" style={ButtonSize}>QUIT</Button>
                    </Link>

                </div>
                :
                !gameFinished &&
                (gotReverse ?
                    <Button color="yellow" size="large" style={ButtonSize} onClick={handleReverse}>Reverse</Button>
                    :
                    <Button color="yellow" size="large" style={{ ButtonSize, opacity: '0.3' }}>Reverse</Button>)
            }
            {gameStarted && !gameFinished && !myWeaponUsingInThisGame &&
                <div style={MyButton}>
                    <Button color="yellow" size="large" style={ButtonSize} onClick={handleNamanmoo}>나만의무기!</Button> </div> }
            {gameStarted && !gameFinished && myWeaponUsingInThisGame &&
                <div style={MyButton}>
                    <Button color="yellow" size="large" style={ButtonSize} onClick={handleNamanmoo}>나만의무기 사용완료!</Button> </div> }
            {(gameFinished && bestDone) &&
                <div style={MyButton}>
                    {chief &&
                        <Button color="yellow" size="large" style={ButtonSize} onClick={handleRestart}>RESTART</Button>
                    }
                        <Button color="yellow" size="large" style={ButtonSize} onClick={handleQuit}>QUIT</Button>
                </div>
            }
            <div style={{ opacity: '0', height: '6.5rem' }}> </div>
        </Bottom>
    );
}

export default InGameBottom;