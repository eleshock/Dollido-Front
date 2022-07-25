import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// redux import
import { useSelector } from "react-redux";

const Container = styled.div`
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
    width: 250px;
    border-radius: 10%;
    justify-content: center;
    transform: scaleX(-1);
`

const FindVideo = ({stream}) => {
    const ref = useRef();
    useEffect(() => {
        if(stream.id) ref.current.srcObject = stream;
    }, [stream]);
    return <VideoStyle autoPlay ref={ref} />;
};

const Video = ({index}) => {
    const partnerVideos = useSelector((state) => state.videos);
    let temp = useSelector((state) => state.inGame.peerNick);
    let nickName = ""
    console.log(temp);
    if (partnerVideos[index] !== undefined && Object.keys(temp).length !== 0) {
        nickName = temp[partnerVideos[index].id];
    }
    return (
        <Container>
            <NickName>{nickName}</NickName>
            {partnerVideos[index] && <FindVideo stream={partnerVideos[index]}></FindVideo>}
        </Container>
    );
}

export default Video;