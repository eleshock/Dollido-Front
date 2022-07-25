const SET_REVERSE = "item/SET_REVERSE";
const SET_REVERSE_CHECK = "item/SET_REVERSE";

export const setModelsLoaded = (bool) => ({type: SET_MODELS_LOADED, bool});
export const setGameFinish = (bool) => ({type: SET_GAME_FINISH, bool});

const initialState = {
    gameFinished: false,
    gameStarted: false,
}

export default function item(state = initialState, action) {
    switch(action.type) {
        case SET_MODELS_LOADED:
            return { ...state, modelsLoaded: action.bool };
        case SET_GAME_FINISH:
            return { ...state, gameFinished: action.bool };
        default:
            return state;
    }
}