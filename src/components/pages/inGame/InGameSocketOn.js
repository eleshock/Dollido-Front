import { useEffect } from "react";

// redux import
import { useSelector, useDispatch } from "react-redux";
import {
    setChief,
    setChiefStream,
    setGameFinish,
    setGamestart,
    setBestDone,
    setReadyList,
    setRoomID,
    clearReadyList,

} from "../../../modules/inGame";
import { setRandom } from "../../../modules/random";
import { setIsMe, setMyWeapon, setMyWeaponCheck, setMyWeaponImage } from '../../../modules/item';
import { deleteBestVideo } from "./MyVideo";



const InGameSocketOn = ({ match, socket }) => {
    const dispatch = useDispatch();
    async function settingMyweapons (myGIF) {
        dispatch(setMyWeaponImage(myGIF));
    }
    const userNick = useSelector((state) => state.member.member.user_nick);


    // socket on
    useEffect(() => {
        socket.on("wait", ({ status, roomID, chiefStream }) => {
            dispatch(setRoomID(roomID));
            dispatch(setChief(status));
            dispatch(setChiefStream(chiefStream));
        });

        socket.on("chief", ({chiefStream}) => {
            console.log(chiefStream)
            dispatch(setChiefStream(chiefStream));
        });

        socket.on("start", (status, randomList) => {
            console.log(randomList);
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
            deleteBestVideo(userNick); // 이전 비디오 삭제 요청
            dispatch(clearReadyList());
            dispatch(setGamestart(false));
            dispatch(setGameFinish(false));
            dispatch(setBestDone(false));
            dispatch(setMyWeaponCheck(false));
            dispatch(setMyWeapon(false));
        });

        socket.on('my_weapon', async ({randomList, myGIF}) => {
            console.log(myGIF);
            dispatch(setIsMe(false));
            await settingMyweapons(myGIF);
            dispatch(setMyWeapon(true));
            dispatch(setRandom(randomList));
        });

        return () => {
            dispatch(clearReadyList());
        }
    }, [match, socket, dispatch]);

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
    }, [match, socket, dispatch]);

    return <div></div>;
}

export default InGameSocketOn;