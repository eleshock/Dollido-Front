const SET_MY_WEAPON = "item/SET_MY_WEAPON";
const SET_MY_WEAPON_CHECK = "item/SET_MY_WEAPON_CHECK";
const SET_REVERSE = "item/SET_REVERSE";

export const setMyWeapon = (bool) => ({type: SET_MY_WEAPON, bool});
export const setMyWeaponCheck = (bool) => ({type: SET_MY_WEAPON_CHECK, bool});
export const setReverse = (bool) => ({type: SET_REVERSE, bool});

const initialState = {
    myWeapon : false,
    myWeaponCheck: false,
    reverse : false,
}

export default function item(state = initialState, action) {
    switch(action.type) {
        case SET_MY_WEAPON:
            return { ...state, myWeapon: action.bool };
        case SET_MY_WEAPON_CHECK:
            return { ...state, myWeaponCheck: action.bool };
        case SET_REVERSE:
            return { ...state, reverse: action.bool };
        default:
            return state;
    }
}