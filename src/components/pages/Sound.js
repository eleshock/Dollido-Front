import pop from '../../sounds/pop.mp3';
import select from '../../sounds/select.wav';
import enterRoom from '../../sounds/enterRoom.wav';
import exit from '../../sounds/exit.wav';
import waiting from '../../sounds/BGM/waiting_for_laughing_battle.mp3';
import playing from '../../sounds/BGM/playing_comedy_game.mp3';
import celebrate from '../../sounds/BGM/dollido_finally_found_peace.mp3';
import yeah from '../../sounds/yeah.mp3';
import myWeapon from '../../sounds/myWeapon.m4a';
import reverse from '../../sounds/reverse.m4a';
import gameStart from '../../sounds/game_start.mp3';
import mode from '../../sounds/mode.wav';
import judgement from '../../sounds/judgement.mp3';

const playingSF = new Audio(playing);
const celebrateSF = new Audio(celebrate);
const waitingSF = new Audio(waiting);
const yeahSF = new Audio(yeah);
const myWeaponSF = new Audio(myWeapon);
const reverseSF = new Audio(reverse);
const gameStartSF = new Audio(gameStart);

export {
  pop,
  select,
  enterRoom,
  exit,
  mode,
  judgement,
  playingSF,
  celebrateSF,
  waitingSF,
  yeahSF,
  myWeaponSF,
  reverseSF,
  gameStartSF,
}