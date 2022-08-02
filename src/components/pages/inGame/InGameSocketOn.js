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
import {
    setIsWho,
    setIsMe,
    setMyWeapon, 
    setMyWeaponCheck, 
    setMyWeaponImage, 
    setReverse, 
    setGotReverse,
    setZeusAppear,
} from '../../../modules/item';

// sound
import { waitingSF, playingSF, celebrateSF, myWeaponSF, reverseSF, gameStartSF } from "../Sound";


const InGameSocketOn = ({ match, socket }) => {
    const dispatch = useDispatch();
    async function settingMyweapons(myGIF) {
        dispatch(setMyWeaponImage(myGIF));
    }
    const userNick = useSelector((state) => state.member.member.user_nick);


    playingSF.loop = true;

    // socket on
    useEffect(() => {
        socket.on("wait", ({ status, roomID, chiefStream }) => {
            dispatch(setRoomID(roomID));
            dispatch(setChief(status));
            dispatch(setChiefStream(chiefStream));
        });

        socket.on("chief", ({ chiefStream }) => {
            // console.log(chiefStream)
            dispatch(setChiefStream(chiefStream));
        });

        socket.on("start", (status, randomList) => {
            // console.log(randomList);
            if (status) {
                dispatch(setRandom(randomList));
                dispatch(setGamestart(true));
                playingSF.currentTime = 0;
                celebrateSF.currentTime = 0;
                waitingSF.currentTime = 0;
                playingSF.play();
                gameStartSF.play();
            }
        });

        socket.on("finish", () => {
            dispatch(setGameFinish(true));
            dispatch(setZeusAppear(false));
            playingSF.pause();
            celebrateSF.play();
        });

        socket.on("ready", ({ streamID, isReady }) => {
            dispatch(setReadyList(streamID, isReady));
        });

        socket.on("restart", () => {
            dispatch(clearReadyList());
            dispatch(setGamestart(false));
            dispatch(setGameFinish(false));
            dispatch(setBestDone(false));
            dispatch(setMyWeaponCheck(false));
            dispatch(setMyWeapon(false));
            dispatch(setGotReverse(false));
            celebrateSF.pause();
        });

        socket.on('my_weapon', async ({ randomList, myGIF, myNickname }) => {
            dispatch(setIsMe(false));
            dispatch(setIsWho(myNickname));
            await settingMyweapons(myGIF);
            dispatch(setMyWeapon(true));
            dispatch(setRandom(randomList));
            myWeaponSF.play();
        });

        socket.on('reverse', () => {
            dispatch(setReverse(true));
            setTimeout(() => dispatch(setReverse(false)), 8000);
            reverseSF.play();
        });

        socket.on("send-reverse", () => {
            dispatch(setGotReverse(true));
        })

        socket.on("zeus_appear", () => {
            dispatch(setZeusAppear(true));
        });

        socket.on("zeus_disappear", () => {
            dispatch(setZeusAppear(false));
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