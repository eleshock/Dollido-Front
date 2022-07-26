import Chat from "./Chat";
import Giftest from "./Giftest";
import BestPerformer from "./BestPerformer";
import MyWeapon from "./MyWeapon";

// redux import
import { useSelector } from "react-redux";

const InGameContent = ({socket}) => {
    const nickName = useSelector((state) => state.member.member.user_nick);
    const inGameState = useSelector((state) => state.inGame);
    const itemState = useSelector((state) => (state.item));
    const gameFinished = inGameState.gameFinished;
    const gameStarted = inGameState.gameStarted;
    const roomID = inGameState.roomID;
    const itemUsing = itemState.myWeapon;

    return (
        <div>
            {gameStarted ?
                !itemUsing ?
                    gameFinished ?
                    <BestPerformer roomID={roomID}></BestPerformer>
                    :
                    <Giftest></Giftest>
                    :
                    <MyWeapon socket={socket}></MyWeapon>
                    :
                    <Chat socket={socket} username={nickName} room={roomID}></Chat>
            }
        </div>
    );
}

export default InGameContent;