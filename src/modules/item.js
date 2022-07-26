const SET_REVERSE = "item/SET_REVERSE";
const SET_REVERSE_CHECK = "item/SET_REVERSE_CHECK";

export const setReverse = (bool) => ({type: SET_REVERSE, bool});
export const setReverseCheck = (bool) => ({type: SET_REVERSE_CHECK, bool});

const initialState = {
    reverse: false,
    reverseCheck: false,
}

export default function item(state = initialState, action) {
    switch(action.type) {
        case SET_REVERSE:
            return { ...state, reverse: action.bool};
        case SET_REVERSE_CHECK:
            return { ...state, reverseCheck: action.bool};
        default:
            return state;
    }
}