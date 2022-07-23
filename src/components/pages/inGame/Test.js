import React from "react";
import styled from "styled-components";

import InGameContent from "./InGameContent";
import TestVideo from "./Video";
import Video from "./TestVideo";
import HP from "./HP";
import IsReady from "./IsReady";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 19;
`

const LeftContent = styled.div`
    flex: 1;
`

const MidleContent = styled.div`
    flex: 1.5;
`

const RightContent = styled.div`
    flex: 1;
`

const Content = styled.div`
    height: 100%;
`

const EachContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 15px;
    height: 50%;
    text-align: center;
`

const Test = ({socket, match}) => {
    return (
        <Container>
            <LeftContent>
                <EachContent>
                    <Video index={0}></Video>
                    <HP index={0}></HP>
                    <IsReady index={0}></IsReady>
                </EachContent>
                <EachContent>
                    <Video index={0}></Video>
                    <HP index={0}></HP>
                    <IsReady index={0}></IsReady>
                </EachContent>
            </LeftContent>
            <MidleContent>
                <Content>
                    <InGameContent></InGameContent>
                </Content>
            </MidleContent>
            <RightContent>
                <EachContent>
                    <Video index={1}></Video>
                    <HP index={1}></HP>
                    <IsReady index={1}></IsReady>
                </EachContent>
                <EachContent>
                    <Video index={2}></Video>
                    <HP index={2}></HP>
                    <IsReady index={2}></IsReady>
                </EachContent>
            </RightContent>
        </Container>
    );
}

export default Test;