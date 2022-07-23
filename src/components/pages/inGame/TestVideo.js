import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// redux import
import { useSelector } from "react-redux";

const Container = styled.div`
    flex: 13;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const NickName = styled.h2`
    flex: 1;
    color: white;
`

const VideoStyle = styled.video`
    flex: 9;
    width: 85%;
    border-radius: 10%;
    justify-content: center;
    border: 1px solid red;
`

const FindVideo = ({stream}) => {
    const ref = useRef();
    useEffect(() => {
        ref.current.srcObject = stream;
    }, [stream]);
    return <VideoStyle autoPlay ref={ref} />;
};

const Video = ({index}) => {

    const partnerVideos = useSelector((state) => state.videos);

    return (
        <Container>
            <NickName>닉네임</NickName>
            <FindVideo stream={partnerVideos[index]}></FindVideo>
        </Container>
    );
}

export default Video;