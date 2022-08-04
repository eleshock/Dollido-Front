import { combineReducers } from 'redux';
import { videos } from "./videos";
import member from "./member";
import inGame from './inGame';
import { random } from "./random";
import item from "./item";

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}	// 추가

const rootReducer = combineReducers({
  member: member,
  inGame: inGame,
  videos: videos,
  random: random,
  item: item,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;