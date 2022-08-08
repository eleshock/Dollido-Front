import styled from "styled-components";

// image import
import mainBackground from "../../../images/mainBackground.gif";

// commponent import
import InGameHeader from "./Header";
import InGameSocketOn from "./InGameSocketOn";
import InGameVideo from "./InGameVideo";
import WebRTC from "./WebRTC";
import { GlobalInGameBackGround } from "../../common/Global.tsx"

//새로고침, 뒤로가기 방지
import {PreventReload} from "../../common/usefulFuntions.js";


const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: koverwatch;
`


const InGame = ({ match, socket}) => {
    PreventReload(); // 새로고침 방지 
    return (
        <div>
            <GlobalInGameBackGround bgImage={mainBackground}></GlobalInGameBackGround>
            <FlexContainer>
                <InGameSocketOn socket={socket} match={match}></InGameSocketOn>
                <WebRTC socket={socket} match={match}></WebRTC>
                <InGameHeader socket={socket} match={match}></InGameHeader>
                <InGameVideo socket={socket} match={match}></InGameVideo>
            </FlexContainer>
        </div>
    );
}

export default InGame;