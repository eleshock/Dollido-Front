import styled from "styled-components";

// image import
import mainBackground from "../../../images/mainBackground.gif";

// commponent import
import { Background } from "../../common/Background.tsx";
import InGameHeader from "./Header";
import InGameBottom from "./Bottom";
import InGameSocketOn from "./InGameSocketOn";
import InGameVideo from "./InGameVideo";
import WebRTC from "./WebRTC";


const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: koverwatch;
`

const InGame = ({ match, socket}) => {
    return (
        <Background
            background={mainBackground}
            element={
                <FlexContainer>
                    <InGameSocketOn socket={socket} match={match}></InGameSocketOn>
                    <WebRTC socket={socket} match={match}></WebRTC>
                    <InGameHeader socket={socket} match={match}></InGameHeader>
                    <InGameVideo socket={socket} match={match}></InGameVideo>
                    <InGameBottom socket={socket} match={match}></InGameBottom>
                </FlexContainer>
            }>
        </Background>
    );
}

export default InGame;