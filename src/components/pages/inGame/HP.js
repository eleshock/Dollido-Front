import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import effect from "../../../images/laughEffection.webp";
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
    display: flex;
    width: 320px;
    color: white;
    justify-content: center;
    margin-top: 20px;
`

const Content = styled.div`
    width: 80%;
`

const HP = ({ socket, index }) => {
    const partnerVideos = useSelector((state) => state.videos);
    const peersHP = useRef(100);
    const [content, setContent] = useState(<Container>
      <Content><ProgressBar striped variant="danger" now={peersHP.current} /></Content>
          </Container>);
    useEffect(() => {
      socket.on("smile", (peerHP, peerID, peerStreamID) => {
        if (partnerVideos[index].id === peerStreamID) {
          peersHP.current = peerHP;

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
                <img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"50%", left:"8%" }}></img>
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
                <img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"50%", right:"8%" }}></img>
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
      }

      })
    }, [socket])

    return content;
}

export default HP;