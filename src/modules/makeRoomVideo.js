const SET_ON_VIDEO = "item/SET_ON_VIDEO";

export const setOnVideo = (bool) => ({type: SET_ON_VIDEO, bool});


const initialState = {
    onVideo : false,
}

export default function item(state = initialState, action) {
    switch(action.type) {
        case SET_ON_VIDEO:
            return { ...state, onVideo: action.bool };
        default:
            return state;
    }
}