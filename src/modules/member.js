const SET_MEMBER = "member/SET_MEMBERS";
const SET_USER_GIF = "member/SET_USER_GIF";
const SET_MEMBER_INIT = "member/SET_MEMBER_INIT";

export const setMember = (data) => ({ type: SET_MEMBER, data });
export const setUserGif = (data) => ({ type: SET_USER_GIF, data });

const initialState = {
    member: {
        user_id: null,
        user_nick: "anonymous",
        tokenInfo: {
            token: null,
            refreshToken: null
        }
    },
    user_gif: null,
};

export default function member(state = initialState, action) {
    switch (action.type) {
        case SET_MEMBER:
            return { ...state, member: action.data };
        case SET_USER_GIF:
            return {...state, user_gif: action.data };
        case SET_MEMBER_INIT:
            return {
                member: {
                    user_id: null,
                    user_nick: "anonymous",
                    tokenInfo: {
                        token: null,
                        refreshToken: null
                    }
                },
                user_gif: null,
            }
        default:
            return state;
    }
}