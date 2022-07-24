const SET_MODELS_LOADED = "inGame/SET_MODELS_LOADED";
const SET_GAME_FINISH = "inGame/SET_GAME_FINISH";
const SET_GAME_START = "inGame/SET_GAME_START";
const SET_MY_STREAM = "inGame/SET_MY_STREAM";
const SET_PEER_NICK = "inGame/SET_PEER_NICK";
const CLEAR_PEER_NICK = "inGame/CLEAR_PEER_NICK";
const DELETE_PEER_NICK = "inGame/DELETE_PEER_NICK"
const SET_ROOM_ID = "inGame/SET_ROOM_ID";
const SET_CHIEF = "inGame/SET_CHIEF";

export const setModelsLoaded = (bool) => ({type: SET_MODELS_LOADED, bool});
export const setGameFinish = (bool) => ({type: SET_GAME_FINISH, bool});
export const setGamestart = (bool) => ({type: SET_GAME_START, bool});
export const setMyStream = (stream) => ({type: SET_MY_STREAM, stream});
export const setPeerNick = (nickName) => ({type: SET_PEER_NICK, nickName});
export const clearPeerNick = () => ({type: CLEAR_PEER_NICK});
export const deletePeerNick = (nickName) => ({type: DELETE_PEER_NICK, nickName});
export const setRoomID = (roomID) => ({type: SET_ROOM_ID, roomID});
export const setChief = (bool) => ({type: SET_CHIEF, bool});

const initialState = {
    gameFinished: false,
    gameStarted: false,
    modelsLoaded: false,
    myStream: null,
    peerNick: [], 
    roomID: null,
    chief: false,
}

export default function inGame(state = initialState, action) {
    switch(action.type) {
        case SET_MODELS_LOADED:
            return { ...state, modelsLoaded: action.bool };
        case SET_GAME_FINISH:
            return { ...state, gameFinished: action.bool};
        case SET_GAME_START:
            return { ...state, gameStarted: action.bool};
        case SET_MY_STREAM:
            return { ...state, myStream: action.stream};
        case SET_PEER_NICK:
            const temp = [...state.peerNick, action.nickName];
            const peer = temp.filter((val) => val !== undefined);
            return {...state , peerNick: peer};
        case CLEAR_PEER_NICK:
            return {...state, peerNick: []};
        case DELETE_PEER_NICK:
            const peerDelete = state.peerNick.filter((val) => val !== action.nickName);
            return {...state, peerNick: peerDelete}
        case SET_ROOM_ID:
            return { ...state, roomID: action.roomID };
        case SET_CHIEF:
            return { ...state, chief: action.bool };
        default:
            return state;
    }
}