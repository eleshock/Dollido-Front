import { Link } from "react-router-dom";
import styled from "styled-components";

// commponent import
import Button from "../../common/Button";

// redux import
import { useSelector } from "react-redux";


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
    const inGameState = useSelector((state) => (state.inGame));
    const itemState = useSelector((state) => state.item);
    const chief = inGameState.chief;
    const chiefStream = inGameState.chiefStream;
    const myStream = inGameState.myStream;
    const gameStarted = inGameState.gameStarted;
    const gameFinished = inGameState.gameFinished;
    const roomID = inGameState.roomID;
    const ReverseCheck = itemState.reverseCheck;
    const Reverse = itemState.reverse;
    
    function handleReady() {
        socket.emit("ready", {roomID: roomID});
    } 

    function handleStart() {
        console.log(myStream);
        socket.emit("start", {roomID: roomID});
    }

    function HandleReverseStart() {
        if(ReverseCheck == false && Reverse == false && gameStarted){
            console.log("Start")
          socket.emit("reverse", {roomID: roomID, socketID: socket.id})
        }
      }

    function handleRestart() {
        socket.emit("restart", {roomID: roomID});
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
            {gameStarted ? <Button color="yellow" size="large" style={ButtonSize} onClick={HandleReverseStart}>
                     REVERSE
                    </Button> : <></>}
            {gameFinished && 
                <div style={MyButton}>
                {chief &&
                    <Button color="yellow" size="large" style={ButtonSize} onClick={handleRestart}>RESTART</Button>
                }
                <Link to="/Lobby">
                    <Button color="yellow" size="large" style={ButtonSize}>QUIT</Button>
                </Link>
            </div>
            }
        </Bottom>
    );
}

export default InGameBottom;