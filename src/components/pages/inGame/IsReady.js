import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import styled from "styled-components";
import readyimage from "../../../images/ready.gif"
import Notreadyimage from "../../../images/Notready.png"
import Chiefimage from "../../../images/Chief.png"
import Playingimage from "../../../images/Playing.png"
import readyvideo from "../../../images/ready.mp4"

const Container = styled.div`
    text-align: center;
    width: 100%;
    color: white;
    flex: 1;
    margin: 0;
`

const IsReady = ({socket, index}) => {
    const partnerVideos = useSelector((state) => state.videos);
    const gameStarted = useSelector((state) => state.inGame.gameStarted);
    const chiefStream = useSelector((state) => state.inGame.chiefStream);
    const readyList = useSelector((state) => state.inGame.readyList[partnerVideos[index].id]);
    const [ready, setReady] = useState(readyList);

    useEffect(() => {
      if (partnerVideos[index] !== undefined) {
        const streamID = partnerVideos[index].id;
        if (streamID) setReady(readyList);
      }
    }, [readyList, index, partnerVideos]);

    return (
        <Container>
          {!gameStarted ?
            (partnerVideos[index].id === chiefStream ?
              <img alt="Chief" src={Chiefimage} style={{margin:"8px 0 0 0",borderRadius: "10px"}} /> :
              <div>{ready ? 
              <video src={readyvideo} autoPlay style={{margin:"8px 0 0 0",borderRadius: "10px"}} ></video>
              : <img alt="Notready" src={Notreadyimage} style={{margin:"8px 0 0 0",borderRadius: "10px"}}/>
            }</div>) :
            <img alt="Plyaing"src={Playingimage} ></img>}
        </Container>
    )
}


export default IsReady;