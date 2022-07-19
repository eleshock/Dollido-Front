const SET_MEMBER = "member/SET_MEMBERS";

export const setMember = (data) => ({type: SET_MEMBER, data});

const initialState = {
    member: {
        user_id: null,
        user_nick: null,
        tokenInfo: {
            token: null,
            refreshToken: null
        }
    }
};

export default function member(state = initialState, action) {
    switch(action.type) {
        case SET_MEMBER:
            return {
                ...state,
                member: action.data
            };
        default:
            return state;
    }
}