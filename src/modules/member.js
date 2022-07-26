const SET_MEMBER = "member/SET_MEMBERS";
const SET_USER_GIF = "member/SET_USER_GIF";

export const setMember = (data) => ({type: SET_MEMBER, data});
export const setUserGif = (data) => ({type: SET_USER_GIF, data});

const initialState = {
    member: {
        user_id: null,
        user_nick: "anonymous",
        user_gif: null,
        tokenInfo: {
            token: null,
            refreshToken: null
        }
    }
};

export default function member(state = initialState, action) {
    switch(action.type) {
        case SET_MEMBER:
            return { ...state, member: action.data };
        case SET_USER_GIF:
            const member = {
                member: {
                    user_id: state.user_id,
                    user_nick: state.user_nick,
                    user_gif: action.data,
                    tokenInfo: {
                        token: state.token,
                        refreshToken: state.refreshToken
                    }
                }
            }
            return member;
        default:
            return state;
    }
}