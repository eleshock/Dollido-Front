const SET_MEMBER = "member/SET_MEMBERS";
const SET_USER_GIF = "member/SET_USER_GIF";
const SET_TIER = "member/SET_TIER";
const SET_RANKING = "member/SET_RANKING";
const SET_WINRATE = "member/SET_WINRATE";
const SET_WIN = "member/SET_WIN";
const SET_LOSE = "member/SET_LOSE";
const SET_CHECKGET = "member/SET_CHECKGET";
const SET_MEMBER_INIT = "member/SET_MEMBER_INIT";

export const setMember = (data) => ({ type: SET_MEMBER, data });
export const setUserGif = (data) => ({ type: SET_USER_GIF, data });
export const setTier = (data) => ({ type: SET_TIER, data });
export const setRanking = (data) => ({ type: SET_RANKING, data });
export const setWinRate = (data) => ({ type: SET_WINRATE, data });
export const setWin = (data) => ({ type: SET_WIN, data });
export const setLose = (data) => ({ type: SET_LOSE, data });
export const setCheckGet = (bool) => ({ type: SET_CHECKGET, bool });


export const setMemberInit = () => ({ type: SET_MEMBER_INIT });

const initialState = {
    member: {
        user_id: null,
        user_nick: "anonymous",
        tokenInfo: {
            token: null,
            refreshToken: null
        },
    },
    user_gif: null,
    tier: null,
    ranking: null,
    win_rate: null,
    win: null,
    lose: null,
    check_get: false,
};

export default function member(state = initialState, action) {
    switch (action.type) {
        case SET_MEMBER:
            return { ...state, member: action.data };
        case SET_USER_GIF:
            return {...state, user_gif: action.data };
        case SET_TIER:
            return {...state, tier: action.data };
        case SET_RANKING:
            return {...state, ranking: action.data };
        case SET_WINRATE:
            return {...state, win_rate: action.data };
        case SET_WIN:
            return {...state, win: action.data };
        case SET_LOSE:
            return {...state, lose: action.data };
        case SET_CHECKGET:
            return { ...state, check_get: action.bool };
        case SET_MEMBER_INIT:
            return {
                member: {
                    user_id: null,
                    user_nick: "anonymous",
                    tokenInfo: {
                        token: null,
                        refreshToken: null
                    },
                },
                user_gif: null,
                tier: null,
                ranking: null,
                win_rate: null,
                win: null,
                lose: null,
            }
        default:
            return state;
    }
}