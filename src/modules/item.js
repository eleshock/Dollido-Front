const SET_MY_WEAPON = "item/SET_MY_WEAPON";
const SET_MY_WEAPON_CHECK = "item/SET_MY_WEAPON_CHECK";
const SET_REVERSE = "item/SET_REVERSE";
const SET_GOT_REVERSE = "item/SET_GOT_REVERSE";

export const setMyWeapon = (bool) => ({type: SET_MY_WEAPON, bool});
export const setMyWeaponCheck = (bool) => ({type: SET_MY_WEAPON_CHECK, bool});
export const setReverse = (bool) => ({type: SET_REVERSE, bool});
export const setGotReverse = (bool) => ({type: SET_GOT_REVERSE, bool});

const initialState = {
    myWeapon : false,
    myWeaponCheck: false,
    reverse : false,
    gotReverse : false,
}

export default function item(state = initialState, action) {
    switch(action.type) {
        case SET_MY_WEAPON:
            return { ...state, myWeapon: action.bool };
        case SET_MY_WEAPON_CHECK:
            return { ...state, myWeaponCheck: action.bool };
        case SET_REVERSE:
            return { ...state, reverse: action.bool };
        case SET_GOT_REVERSE:
            return { ...state, gotReverse: action.bool };
        default:
            return state;
    }
}