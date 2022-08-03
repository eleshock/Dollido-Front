import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import InGameContent from "./InGameContent";
import MyVideo from "./MyVideo";
import Video from "./PeerVideo";
import HP from "./HP";
import IsReady from "./IsReady";
import Bottom from "./Bottom";
import Judgement from "./Judgement";
import ZeusAppear from "./ZeusAppear";



const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 20;
    height: 100vh;
    overflow: hidden;
    position: relative;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`

const EachContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 50%;
`

const Test = ({socket, match}) => {
    return (
        <Container>
            <ZeusAppear></ZeusAppear>
            <LeftContent>
                <EachContent>
                    <MyVideo socket={socket} match={match}></MyVideo>
                </EachContent>
                <EachContent>
                    <Video index={1}></Video>
                    <Judgement index={1}></Judgement>
                    <HP socket={socket} index={1}></HP>
                    <IsReady index={1}></IsReady>
                </EachContent>
            </LeftContent>
            <MidleContent>
                <Content>
                    <InGameContent socket={socket}></InGameContent>
                    <Bottom socket={socket} match={match}></Bottom>
                </Content>
            </MidleContent>
            <RightContent>
                <EachContent>
                    <Video index={0}></Video>
                    <Judgement index={0}></Judgement>
                    <HP socket={socket} index={0}></HP>
                    <IsReady index={0}></IsReady>
                </EachContent>
                <EachContent>
                    <Video index={2}></Video>
                    <Judgement index={2}></Judgement>
                    <HP socket={socket} index={2}></HP>
                    <IsReady index={2}></IsReady>
                </EachContent>
            </RightContent>
        </Container>
    );
}

export default Test;