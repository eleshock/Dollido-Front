import styled from "styled-components";

// image import
import mainBackground from "../../../images/mainBackground.gif";

// commponent import
import InGameHeader from "./Header";
import InGameSocketOn from "./InGameSocketOn";
import InGameVideo from "./InGameVideo";
import WebRTC from "./WebRTC";
import { GlobalStyles } from "../../common/Global.ts"


const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: koverwatch;
`

const InGame = ({ match, socket}) => {
    return (
        <div>
            <GlobalStyles bgImage={mainBackground}></GlobalStyles>
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