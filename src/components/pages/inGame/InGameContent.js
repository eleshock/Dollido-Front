import Chat from "./Chat";
import Giftest from "./Giftest";
import BestPerformer from "./BestPerformer";

// redux import
import { useSelector } from "react-redux";

const InGameContent = ({socket}) => {
    const inGameState = useSelector((state) => state.inGame);
    const gameFinished = inGameState.gameFinished;
    const gameStarted = inGameState.gameStarted;
    const roomID = inGameState.roomID;
    
    return (
        <div>
            {gameStarted ?
                gameFinished ?
                <BestPerformer></BestPerformer>
                :
                <Giftest></Giftest>
                :
                <Chat socket={socket} username={localStorage.nickname} room={roomID}></Chat>
            }
        </div>
    );
}

export default InGameContent;