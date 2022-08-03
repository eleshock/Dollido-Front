import { Background } from "../common/Background.tsx";
// import "../common/RoomMode.css"
import mainBackGround from "../../images/mainBackground.gif";
import ModeOne from "../../images/ModeOne.gif";
import ModeTwo from "../../images/ModeTwo.gif";
import ModeThree from "../../images/ModeThree.gif";
import styled from "styled-components";

import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";

import useSound from 'use-sound';
import { select, exit, celebrateSF, playingSF } from './Sound'
import SimpleSlider from "./TutorialContent";

const FlexContainer = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  fontFamily: "koverwatch",
};
const Header = {
  flex: "1",
  color: "white",
  textAlign: "left",
};

const Middle = {
  flex: "7",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
};

const Bottom = {
  flex: "2",
  // textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
};

const Content = styled.div`
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 25px 50px 0 #f4dbf4;
  }
`;

const Modeimage = styled.img`
  &:hover {
  }
`;
const GradationTitle = styled.h1`
  margin: 10px 0 10px 0;
  color: white;
  font-size: 4rem;
  font-style: italic;
  user-select: none;
  background: linear-gradient(to right top, #ffffff, #ffffff);
  //   -webkit-text-stroke: 3px black;
  color: transparent;
  -webkit-background-clip: text;
`;

const modename = {
  // color: "black",
  // backgroundColor: "white",
  // fontStyle: "italic",
  // margin: "0 0 0 0"
};


const modecontentone ={
  color : "black",
  backgroundColor: "#FFFFFF",
  display: "flex",
  alignItems:"flex-end",
  justifyContent: "center",
  margin: "0 0 0 0",
  padding: "20px 0 0 0",

}

const modecontenttwo ={
  color : "black",
  backgroundColor: "#FFFFFF",
  display: "flex",
  alignItems:"flex-end",
  justifyContent: "center",
  margin: "0 0 0 0",
  padding: "0 0 20px 0",

}


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

  
  const [selectSound] = useSound(
    select,
    { volume: 0.5 }
  );
  const [exitSound] = useSound(
    exit,
  );


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
