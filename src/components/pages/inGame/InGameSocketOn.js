import { useEffect } from "react";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setChief, setGameFinish, setGamestart, setRoomID } from "../../../modules/inGame";

const InGameSocketOn = ({ match, socket }) => {
    const dispatch = useDispatch();
    const inGameState = useSelector((state) => ({
        state: state.inGame
    }));
    const finish = inGameState.state.gameFinished;
    const start = inGameState.state.gameStarted;

    // socket on
    useEffect(() => {
        socket.on("stop", () => {
            socket.emit("test");
        })

        socket.on("wait", ({ status, roomID }) => {
            dispatch(setRoomID(roomID));
            dispatch(setChief(status));
        });

        socket.on("start", (status) => {
            if (status) {
                dispatch(setGamestart(true));
            } else {
                alert("아직 다 ready를 하지 않았습니다");
            }
        });

        socket.on("finish", () => {
            dispatch(setGameFinish(true));
            dispatch(setGamestart(false));
        });

    }, [match, socket]);

    return <div></div>;
}

export default InGameSocketOn;