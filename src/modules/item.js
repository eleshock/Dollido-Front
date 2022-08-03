const SET_MY_WEAPON = "item/SET_MY_WEAPON";
const SET_MY_WEAPON_CHECK = "item/SET_MY_WEAPON_CHECK";
const SET_MY_WEAPON_IMAGE = "item/SET_MY_WEAPON_IMAGE";
const SET_IS_ME = "item/SET_IS_ME";
const SET_IS_WHO = "item/SET_IS_WHO";

const SET_REVERSE = "item/SET_REVERSE";
const SET_GOT_REVERSE = "item/SET_GOT_REVERSE";

const SET_JUDGEMENT_LIST = "item/SET_JUDGEMENT_LIST";
const SET_ZEUS_APPEAR = "item/SET_ZEUS_APPEAR";
const SET_ITEM_INIT = "item/SET_ITEM_INIT";

export const setMyWeapon = (bool) => ({type: SET_MY_WEAPON, bool});
export const setMyWeaponCheck = (bool) => ({type: SET_MY_WEAPON_CHECK, bool});
export const setMyWeaponImage = (image) => ({type: SET_MY_WEAPON_IMAGE, image});
export const setIsMe = (bool) => ({type: SET_IS_ME, bool});
export const setIsWho = (otherID) => ({type: SET_IS_WHO, otherID});

export const setReverse = (bool) => ({type: SET_REVERSE, bool});
export const setGotReverse = (bool) => ({type: SET_GOT_REVERSE, bool});

export const setJudgementList = (streamID, bool) => ({type: SET_JUDGEMENT_LIST, streamID, bool});
export const setZeusAppear = (bool) => ({type: SET_ZEUS_APPEAR, bool});

export const setItemInit = () => ({type: SET_ITEM_INIT});

const initialState = {
    myWeapon : false,
    myWeaponCheck: false,
    myWeaponImage: null,
    isMe: true,
    isWho: null,
    reverse : false,
    gotReverse : false,
    judgementList : {},
    zeusAppear: false,
}

export default function item(state = initialState, action) {
    switch(action.type) {
        case SET_MY_WEAPON:
            return { ...state, myWeapon: action.bool };
        case SET_MY_WEAPON_CHECK:
            return { ...state, myWeaponCheck: action.bool };
        case SET_MY_WEAPON_IMAGE:
            return { ...state, myWeaponImage: action.image };
        case SET_IS_ME:
            return { ...state, isMe: action.bool };
        case SET_IS_WHO:
            return { ...state, isWho: action.otherID };
        case SET_REVERSE:
            return { ...state, reverse: action.bool };
        case SET_GOT_REVERSE:
            return { ...state, gotReverse: action.bool };
        case SET_JUDGEMENT_LIST:
            state.judgementList[action.streamID] = action.bool;
            return { ...state, judgement: {...state.judgementList} };
        case SET_ZEUS_APPEAR:
            return { ...state, zeusAppear: action.bool };
        case SET_ITEM_INIT:
            return {
                myWeapon : false,
                myWeaponCheck: false,
                myWeaponImage: null,
                isMe: true,
                isWho: null,
                reverse : false,
                gotReverse : false,
                judgementList : {},
                zeusAppear: false,
            }
        default:
            return state;
    }
}