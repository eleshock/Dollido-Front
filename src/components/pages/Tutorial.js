import styled from "styled-components";

import { Link } from "react-router-dom";

import useSound from 'use-sound';
import { select, exit, celebrateSF, playingSF } from './Sound'
import SimpleSlider from "./TutorialContent";


const BackToLobby = styled(Link)`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: auto;
  height: auto;
  color: white;
  font-size: 2rem;
  padding: 3px;
  margin: 0 100px 0 0;
  text-decoration: none;
  font-family:koverwatch;
  &:hover {
    transform: scale(1.2);
    color: white;
  }
`;


function Tutorial() {

  // game sound
  celebrateSF.pause();
  playingSF.pause();



  return (
      <>
        <div style={{height:"100%"}}>
          <SimpleSlider />
        </div>
        <BackToLobby to = {'/lobby'}  >&lt; 뒤로가기</BackToLobby>
    </>
    
  );
}

export default Tutorial;
