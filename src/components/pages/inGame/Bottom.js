import { Link } from "react-router-dom";
import styled from "styled-components";

// commponent import
import Button from "../../common/Button";
import Button3 from "../../common/Button3";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setMineHP } from "../../../modules/inGame";
import { setMyWeapon, setMyWeaponCheck } from '../../../modules/item';



const Bottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-family: koverwatch;
`
const MyButton = {
    flex: '3',
    display: "flex",
    justifyContent: 'space-around',
    alignItems: 'center'
}

const ButtonSize = {
    fontSize: "18px",
    lineHeight: "45px",
    width: "150px",
    height: "45px",
    margin: "30px",
    textDecoration:"none"

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
            if (myStream && myStream.id){
                console.log(myID);
                socket.emit("my_weapon", roomID, myID, myStream.id);
                // socket.emit("my_weapon", roomID, myStream.id);

            }
            dispatch(setMyWeapon(true));
            dispatch(setMyWeaponCheck(true));
        }
    }

    return (
        <Bottom>
            {!gameStarted &&
                <div style={MyButton}>
                    {myStream && (chief || chiefStream === myStream.id)?
                        <div>
                        <Button3 style={ButtonSize} onClick={handleStart}>START</Button3>
                        </div>
                        :
                        <Button3 style={ButtonSize} onClick={handleReady}>Ready</Button3>
                    }
                    <Link to="/Lobby" style={{textDecoration:"none"}}>
                        <Button3 style={ButtonSize}>Quit</Button3>
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