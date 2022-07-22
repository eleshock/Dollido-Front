import { Link } from "react-router-dom";
import styled from "styled-components";

// commponent import
import Button from "../Button";

// redux import
import { useSelector } from "react-redux";

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex: 15;
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
    margin: "25px"
}

const InGameBottom = ({socket}) => {
    const inGameState = useSelector((state) => ({ state: state.inGame }));
    const chief = inGameState.state.chief;
    const roomID = inGameState.state.roomID;

    function handleReady() {
        socket.emit("ready", {roomID: roomID});
    } 

    function handleStart() {
        socket.emit("start", {roomID: roomID});
    }

    return (
        <Bottom>
            <div style={MyButton}>
                {chief?
                    <Button color="yellow" size="large" style={ButtonSize} onClick={handleStart}>START</Button>
                    :
                    <Button color="yellow" size="large" style={ButtonSize} onClick={handleReady}>Ready</Button>
                }
                <Link to="/Lobby">
                    <Button color="yellow" size="large" style={ButtonSize}>QUIT</Button>
                </Link>
            </div>
        </Bottom>
    );
}

export default InGameBottom;