import Chat from "./Chat";
import Giftest from "./Giftest";
import BestPerformer from "./BestPerformer";
import MyWeapon from "./MyWeapon";

// redux import
import { useSelector } from "react-redux";

const InGameContent = ({socket}) => {
    const nickName = useSelector((state) => state.member.member.user_nick);
    const gameFinished = useSelector((state) => state.inGame.gameFinished);
    const gameStarted = useSelector((state) => state.inGame.gameStarted);
    const roomID = useSelector((state) => state.inGame.roomID);
    const itemUsing = useSelector((state) => (state.item.myWeapon));

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