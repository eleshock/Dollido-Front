import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.h2`
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
// [[socketid, streamid], ....]
    const [ready, setReady] = useState(false)
    useEffect(() => {
      socket.on("ready", ({readyList}) => {
        readyList.map((readyUser) => {
            if (partnerVideos[index].id === readyUser[1]){
                setReady(true);
            }
        })
        });
    }, [socket])
    return (
        <Container>
          {!gameStarted ?
            (partnerVideos[index].id === chiefStream ?
              <h2 style = {{color:"orange"}}>방장</h2> :
              <h2 style = {{color: "white"}}>{ready ? "ready" : "not ready"}</h2>) :
              <h2 style = {{color:"white"}}>Playing</h2>}
        </Container>
    )
}


export default IsReady;