import { useEffect } from "react";

// redux import
import { useDispatch } from "react-redux";
import {
    setChief,
    setChiefStream,
    setGameFinish,
    setGamestart,
    setReadyList,
    setRoomID,
    clearReadyList
} from "../../../modules/inGame";
import { setRandom } from "../../../modules/random";

const InGameSocketOn = ({ match, socket }) => {
    const dispatch = useDispatch();

    // socket on
    useEffect(() => {
        socket.on("wait", ({ status, roomID, chiefStream }) => {
            dispatch(setRoomID(roomID));
            dispatch(setChief(status));
            dispatch(setChiefStream(chiefStream));
        });

        socket.on("chief", ({chiefStream}) => {
            dispatch(setChiefStream(chiefStream));
        });

        socket.on("start", (status, randomList) => {
            if (status) {
                dispatch(setRandom(randomList));
                dispatch(setGamestart(true));
            }
        });

        socket.on("finish", () => {
            dispatch(setGameFinish(true));
        });

        socket.on("ready", ({streamID, isReady}) => {
            dispatch(setReadyList(streamID, isReady));
        });
        
        socket.on("restart", () => {
            dispatch(setGamestart(false));
            dispatch(setGameFinish(false));
        });
        
        return () => {
            dispatch(clearReadyList());
        }
    }, [match, socket]);

    // socket fail on
    useEffect(() => {
        socket.on("make room fail", (handle) => {
            if (!handle.bool) {
                window.location.replace("/lobby");
                alert(handle.msg);
            }
        });

        socket.on("join room fail", (handle) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });

        socket.on("wait room fail", (handle) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });

        socket.on("start room fail", (handle) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });
    });

    return <div></div>;
}

export default InGameSocketOn;