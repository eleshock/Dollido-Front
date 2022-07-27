import { Link } from "react-router-dom";
import styled from "styled-components";

// commponent import
import Button from "../../common/Button";
import Button3 from "../../common/Button3";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setGotReverse } from "../../../modules/item";

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
    const chief = inGameState.chief;
    const chiefStream = inGameState.chiefStream;
    const myStream = inGameState.myStream;
    const gameStarted = inGameState.gameStarted;
    const gameFinished = inGameState.gameFinished;
    const bestDone = inGameState.bestDone;
    const roomID = inGameState.roomID;
    const reverse = useSelector((state) => (state.item.reverse))
    const gotReverse = useSelector((state) => (state.item.gotReverse))

    function handleReady() {
        socket.emit("ready", { roomID: roomID });
    }

    function handleStart() {
        socket.emit("start", { roomID: roomID });
    }

    function handleRestart() {
        socket.emit("restart", { roomID: roomID });
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
                    <Link to="/Lobby">
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