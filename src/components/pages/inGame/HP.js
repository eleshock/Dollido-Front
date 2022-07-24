import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import effect from "../../../images/laughEffection.webp";
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
    display: flex;
    width: 75%;
    color: white;
    flex: 1.5;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Content = styled.div`
    width: 80%;
`

const HP = ({ socket, index }) => {
    const partnerVideos = useSelector((state) => state.videos);
    console.log(index);
    const peersHP = useRef(100);
    const [content, setContent] = useState(<Container>
      <Content><ProgressBar striped variant="danger" now={peersHP.current} /></Content>
          </Container>);
    useEffect(() => {
      socket.on("smile", (peerHP, peerID, peerStreamID) => {
        if (partnerVideos[index].id === peerStreamID) {
          peersHP.current = peerHP;
        }
        if (index === 0 ) {
          setContent(
          <Container>
            <Content>
              <img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"10%", right:"8%" }}></img>
              <ProgressBar striped variant="danger" now={peersHP.current} />
            </Content>
          </Container>)
          setTimeout(() => {
            setContent(
            <Container>
              <Content>
                <ProgressBar striped variant="danger" now={peersHP.current} />
              </Content>
            </Container>)
          }, 1000);
        } else if (index === 1) {
          setContent(
            <Container>
              <Content>
                <img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"60%", left:"8%" }}></img>
                <ProgressBar striped variant="danger" now={peersHP.current} />
              </Content>
            </Container>
            )
          setTimeout(() => {
            setContent(
              <Container>
                <Content>
                  <ProgressBar striped variant="danger" now={peersHP.current} />
                </Content>
            </Container>)
          }, 1000);
        } else if(index === 2) {
          setContent(
            <Container>
              <Content>
                <img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"60%", right:"8%" }}></img>
                <ProgressBar striped variant="danger" now={peersHP.current} />
              </Content>
            </Container>)
          setTimeout(() => {
            setContent(
            <Container>
              <Content>
              <ProgressBar striped variant="danger" now={peersHP.current} />
              </Content>
            </Container>)
          }, 1000);
        }

      })
    }, [socket, content])

    return content;
}

export default HP;