const SET_MY_WEAPON = "item/SET_MY_WEAPON";
const SET_MY_WEAPON_CHECK = "item/SET_MY_WEAPON_CHECK";
const SET_MY_WEAPON_IMAGE = "item/SET_MY_WEAPON_IMAGE";
const SET_IS_ME = "item/SET_IS_ME";

export const setMyWeapon = (bool) => ({type: SET_MY_WEAPON, bool});
export const setMyWeaponCheck = (bool) => ({type: SET_MY_WEAPON_CHECK, bool});
export const setMyWeaponImage = (image) => ({type: SET_MY_WEAPON_IMAGE, image});
export const setIsMe = (bool) => ({type: SET_IS_ME, bool});


const initialState = {
    myWeapon : false,
    myWeaponCheck: false,
    myWeaponImage: null,
    isMe: true,
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
        default:
            return state;
    }
}