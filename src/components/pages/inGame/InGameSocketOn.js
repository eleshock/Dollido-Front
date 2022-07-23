import { useEffect } from "react";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { idText } from "typescript";
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
        });

    }, [match, socket]);
    
    // socket fail on
    useEffect(() => {
        socket.on("make room fail", ({handle}) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });

        socket.on("join room fail", ({handle}) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });

        socket.on("wait room fail", ({handle}) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });

        socket.on("start room fail", ({handle}) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });
    });

    return <div></div>;
}

export default InGameSocketOn;