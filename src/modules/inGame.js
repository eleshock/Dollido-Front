const SET_MODELS_LOADED = "inGame/SET_MODELS_LOADED";
const SET_GAME_FINISH = "inGame/SET_GAME_FINISH";
const SET_GAME_START = "inGame/SET_GAME_START";
const SET_MY_STREAM = "inGame/SET_MY_STREAM";
const SET_PEER_NICK = "inGame/SET_PEER_NICK";
const CLEAR_PEER_NICK = "inGame/CLEAR_PEER_NICK";
const DELETE_PEER_NICK = "inGame/DELETE_PEER_NICK"
const SET_ROOM_ID = "inGame/SET_ROOM_ID";
const SET_CHIEF = "inGame/SET_CHIEF";
const SET_CHIEF_STREAM = "inGame/SET_CHIEF_STREAM";
const SET_READY_LIST = "inGame/SET_READY_LIST";
const CLEAR_READY_LIST = "inGame/CLEAR_READY_LIST";
const DELETE_READY_LIST = "inGame/DELETE_READY_LIST";
const SET_REVERSE = "inGame/SET_REVERSE";
const SET_REVERSE_CHECK = "inGame/SET_REVERSE_CHECK";
const SET_MY_HP = "inGame/SET_MY_HP";


export const setModelsLoaded = (bool) => ({type: SET_MODELS_LOADED, bool});
export const setGameFinish = (bool) => ({type: SET_GAME_FINISH, bool});
export const setGamestart = (bool) => ({type: SET_GAME_START, bool});
export const setMyStream = (stream) => ({type: SET_MY_STREAM, stream});
export const setPeerNick = (streamID, nickName) => ({type: SET_PEER_NICK, streamID, nickName});
export const clearPeerNick = () => ({type: CLEAR_PEER_NICK});
export const deletePeerNick = (streamID) => ({type: DELETE_PEER_NICK, streamID});
export const setRoomID = (roomID) => ({type: SET_ROOM_ID, roomID});
export const setChief = (bool) => ({type: SET_CHIEF, bool});
export const setChiefStream = (streamID) => ({type: SET_CHIEF_STREAM, streamID});
export const setReadyList = (streamID, bool) => ({type: SET_READY_LIST, streamID, bool});
export const clearReadyList = () => ({type: CLEAR_READY_LIST});
export const deleteReadyList = (streamID) => ({type: DELETE_READY_LIST, streamID});
export const setReverse = (bool) => ({type: SET_REVERSE, bool});
export const setReverseCheck = (bool) => ({type: SET_REVERSE_CHECK, bool});
export const setMineHP = (myHP) => ({type: SET_MY_HP, myHP});


const initialState = {
    gameFinished: false,
    gameStarted: false,
    modelsLoaded: false,
    myStream: null,
    peerNick: {},
    roomID: null,
    chief: false,
    chiefStream: null,
    readyList: {},
    reverse: false,
    reverseCheck: false,
    myHP: null,
}

export default function inGame(state = initialState, action) {
    switch(action.type) {
        case SET_MODELS_LOADED:
            return { ...state, modelsLoaded: action.bool };
        case SET_GAME_FINISH:
            return { ...state, gameFinished: action.bool };
        case SET_GAME_START:
            return { ...state, gameStarted: action.bool };
        case SET_MY_STREAM:
            return { ...state, myStream: action.stream };
        case SET_PEER_NICK:
            state.peerNick[action.streamID] = action.nickName;
            return {...state , ...state.peerNick };
        case CLEAR_PEER_NICK:
            return { ...state, peerNick: {} };
        case DELETE_PEER_NICK:
            delete state.peerNick[action.streamID];
            return { ...state, ...state.peerNick };
        case SET_ROOM_ID:
            return { ...state, roomID: action.roomID };
        case SET_CHIEF:
            return { ...state, chief: action.bool };
        case SET_CHIEF_STREAM:
            return { ...state, chiefStream: action.streamID };
        case SET_READY_LIST:
            state.readyList[action.streamID] = action.bool;
            return { ...state, ...state.readyList };
        case DELETE_READY_LIST:
            delete state.readyList[action.streamID];
            return { ...state, ...state.readyList };
        case CLEAR_READY_LIST:
            return  { ...state, readyList: {} }
        case SET_REVERSE:
            return { ...state, reverse: action.bool};
        case SET_REVERSE_CHECK:
            return { ...state, reverseCheck: action.bool};
            return  { ...state, readyList: {} };
        case SET_MY_HP:
            return { ...state, myHP : action.myHP };
        default:
            return state;
    }
}