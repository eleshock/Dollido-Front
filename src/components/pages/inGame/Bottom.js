import { Link } from "react-router-dom";
import styled from "styled-components";

// commponent import
import Button from "../../common/Button";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setMineHP } from "../../../modules/inGame";
import { setIsMe, setMyWeapon, setMyWeaponCheck } from '../../../modules/item';



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

const InGameBottom = ({socket}) => {
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

    //id 전달
    const membersState = useSelector((state) => (state.member));
    const myID = membersState.member.user_id;
    const myGIF = membersState.user_gif;

    //my weapon useState
    const myWeaponUsing = itemState.myWeapon;
    const myWeaponUsingInThisGame = itemState.myWeaponCheck;







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

    function handleNamanmoo() {
        if (!myWeaponUsingInThisGame && !myWeaponUsing) {
                console.log(myID);
                socket.emit("my_weapon", roomID, myGIF);
                dispatch(setIsMe(true));
                dispatch(setMyWeapon(true));
                dispatch(setMyWeaponCheck(true));
        }
    }

    return (
        <Bottom>
            {!gameStarted &&
                <div style={MyButton}>
                    {myStream && (chief || chiefStream === myStream.id)?
                        <Button color="yellow" size="large" style={ButtonSize} onClick={handleStart}>START</Button>
                        :
                        <Button color="yellow" size="large" style={ButtonSize} onClick={handleReady}>Ready</Button>
                    }
                    <Link to="/Lobby">
                        <Button color="yellow" size="large" style={ButtonSize}>QUIT</Button>
                    </Link>

                </div>
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
                    <Link to="/Lobby">
                        <Button color="yellow" size="large" style={ButtonSize}>QUIT</Button>
                    </Link>
                </div>
            }
            <div style={{ opacity: '0', height: '6.5rem' }}> </div>
        </Bottom>
    );
}

export default InGameBottom;