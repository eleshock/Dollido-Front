import styled from "styled-components";

// image import
import mainBackground from "../../../images/mainBackground.gif";

// commponent import
import { Background } from "../../common/Background.tsx";
import InGameHeader from "../../common/inGame/Header";
import InGameBottom from "../../common/inGame/Bottom";
import InGameVideo from "./Video";
import InGameSocketOn from "./InGameSocketOn";
import InGameContent from "./InGameContent";


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
                    <InGameHeader socket={socket} match={match}></InGameHeader>
                    {/* <InGameContent socket={socket} match={match}></InGameContent> */}
                    <InGameVideo socket={socket} match={match}></InGameVideo>
                    <InGameBottom socket={socket} match={match}></InGameBottom>
                </FlexContainer>
            }>
        </Background>
    );
}

export default InGame;