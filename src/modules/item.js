const SET_MY_WEAPON = "item/SET_MY_WEAPON";
const SET_MY_WEAPON_CHECK = "item/SET_MY_WEAPON_CHECK";
const SET_MY_WEAPON_IMAGE = "item/SET_MY_WEAPON_IMAGE";
const SET_IS_ME = "item/SET_IS_ME";
const SET_IS_WHO = "item/SET_IS_WHO";

const SET_REVERSE = "item/SET_REVERSE";
const SET_GOT_REVERSE = "item/SET_GOT_REVERSE";

const SET_ZEUS = "item/SET_ZEUS";
const SET_JUDGEMENT = "item/SET_JUDGEMENT";
const SET_JUDGEMENTID = "item/SET_JUDGEMENTID";

export const setMyWeapon = (bool) => ({type: SET_MY_WEAPON, bool});
export const setMyWeaponCheck = (bool) => ({type: SET_MY_WEAPON_CHECK, bool});
export const setMyWeaponImage = (image) => ({type: SET_MY_WEAPON_IMAGE, image});
export const setIsMe = (bool) => ({type: SET_IS_ME, bool});
export const setIsWho = (otherID) => ({type: SET_IS_WHO, otherID});

export const setReverse = (bool) => ({type: SET_REVERSE, bool});
export const setGotReverse = (bool) => ({type: SET_GOT_REVERSE, bool});

export const setZeus = (bool) => ({type: SET_ZEUS, bool});
export const setJudgement = (bool) => ({type: SET_JUDGEMENT, bool});
export const setJudgementID = (judgementID) => ({type: SET_JUDGEMENTID, judgementID});


const initialState = {
    myWeapon : false,
    myWeaponCheck: false,
    myWeaponImage: null,
    isMe: true,
    isWho: null,
    reverse : false,
    gotReverse : false,
    zeus: false,
    judgement : false,
    judgementID: null,
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
        case SET_ZEUS:
            return { ...state, zeus: action.bool };
        case SET_JUDGEMENT:
            return { ...state, judgement: action.bool };
        case SET_JUDGEMENTID:
            return { ...state, judgementID: action.judgementID };
        default:
            return state;
    }
}