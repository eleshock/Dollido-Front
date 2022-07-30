import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { ThemeProvider } from "styled-components";

import Button2 from "../common/Button2.js";
import { LobbyModal } from "../common/LobbyModal.tsx";
import mainBackGround from "../../images/mainBackground.gif";
import styled from "styled-components";
import { GlobalStyles } from "../common/Global.tsx";

import useSound from 'use-sound';

import {select, enterRoom, exit, playingSF, celebrateSF} from './Sound'

import { ServerName } from "../../serverName";

// 임시
import { useSelector, useDispatch } from "react-redux";
import { setInit } from "../../modules/inGame.js";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: koverwatch;
`

const TabList = styled.div`
  display: flex;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  flex: 1;
`

const RoomListFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  padding: 0 100px 100px 100px;
`

const RoomTagList = styled.div`
  display: flex;
  justify-content: space-between;
  list-style: none;
  font-size: 2rem;
  user-select: none;
  background-color: #E01FFABB;
`

const RoomTag1 = styled.div`
  display: flex;
  flex: 4;
  border-right: 2px solid #14073c79;
  box-sizing: border-box;
  color: white;
  padding: 10px;
`
const RoomTag2 = styled.div`
  display: flex;
  flex: 3;
  border-right: 2px solid #14073c79;
  box-sizing: border-box;
  color: white;
  padding: 10px;
`
const RoomTag3 = styled.div`
  display: flex;
  flex: 2;
  border-right: 2px solid #14073c79;
  box-sizing: border-box;
  color: white;
  padding: 10px;
`
const RoomTag4 = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  border: 1px solid transparent;
  box-sizing: border-box;
  color: white;
  padding: 10px;
`

const RoomLinkList = styled.li`
  display: flex;
  justify-content: space-between;
  color: white;
  border: 1px solid transparent;
  background-color: #16364A79;
  text-decoration: none;
  font-size: 1.6rem;
  padding: 10px;
  margin: 2px 0 2px 0;
  cursor: pointer;
  list-style: none;
  &:hover {
    background-color: #ED9C21EE;
  };
`
const RoomLink1 = styled.div`
  display: flex;
  flex: 4;
  text-decoration: none;
  user-select: none;
`
const RoomLink2 = styled.div`
  display: flex;
  flex: 3;
  text-decoration: none;
  userSelect: none;
`
const RoomLink3 = styled.div`
  display: flex;
  flex: 2;
  text-decoration: none;
  userSelect: none;
`
const RoomLink4 = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  text-decoration: none;
  userSelect: none;
`

const Video = styled.video`
  display: block;
  margin: 0 auto;
  width: 450px;
  height: 340px;
  transform: scaleX(-1);
`
const PageControl = styled.div`
  display: flex;
  justify-content: center;
`

const LeftTriangle = styled.button`
  display: flex;
  flex: 2;
  border-bottom: 15px solid transparent;
  border-top: 15px solid transparent;
  border-left: 15px solid transparent;
  border-right: 15px solid skyblue;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    border-right: 15px solid orange;
  };
`

const RightTriangle = styled.button`
  display: flex;
  flex: 2;
  border-bottom: 15px solid transparent;
  border-top: 15px solid transparent;
  border-left: 15px solid skyblue;
  border-right: 15px solid transparent;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    border-left: 15px solid orange;
  };
`

let startVideoPromise;

const Lobby = () => {

  const navigate = useNavigate();
  
  // game sound
  celebrateSF.pause();
  playingSF.pause();

  const [enterGame] = useSound(
    enterRoom,
    { volume: 0.5 }
  );
  const [selectSound] = useSound(
    select,
    { volume: 0.5 }
  );
  const [exitSound] = useSound(
    exit,
  );
  


  // 임시
  const nickname = useSelector((state) => state.member.member.user_nick);

  /* 방 만들기 & 입장 */
  const SERVER_ADDRESS = useRef(ServerName);
  const socket = useRef();
  const [rooms, setRooms] = useState({});
  const [roomCount, setRoomCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;
  const dispatch = useDispatch();

  // 1. 방 리스트 받아오기
  useEffect(() => {
    socket.current = io(SERVER_ADDRESS.current, {
      withCredentials: false,
      extraHeaders: {
        "dollido-header": "dollido",
      },
    });
    socket.current.emit("get room list");
    dispatch(setInit());
    return () => {
      stopWebcam();
    }
  }, []);

  useEffect(() => {
    socket.current.on("give room list", (rooms) => {
      setRooms(rooms);
      setRoomCount(Object.keys(rooms).length);
    });
  }, [rooms]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (rooms) => {
    let currentPosts = 0;
    currentPosts = Object.entries(rooms).reverse().slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };



  const nextPage = (roomCount) => {
    if (currentPage < Math.ceil(roomCount / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [modal, setModal] = useState(false);
  const selectRoom = (room) => {
    localStorage.roomLink = room[0];
    localStorage.roomName = room[1].roomName;
    localStorage.roommode = room[1].roommode;
    setModal(true);
    startVideo();
  };

  const videoRef = useRef();

  const startVideo = (deviceId) => {
    startVideoPromise = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: deviceId ? { deviceId } : true,
    })
    startVideoPromise.then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
    })
    .catch ((err) => {
        console.log(err);
    });
  };

  const stopWebcam = async () => {
    if (startVideoPromise) {
      await startVideoPromise.then(stream => {
          stream.getTracks().forEach(track => {
              track.stop();
          });
      });
    }
  }

  const handleMakeRoom = () => {
    navigate('/makeroom');
  }

  const backToLoomList = () => {
    setModal(false);
    stopWebcam();
  };

  return (
    <ThemeProvider
      theme={{
        palette: {
          yellow: "#E5B941",
          orange: "#F0A82BEE"
        },
      }}
    >
      <GlobalStyles bgImage={mainBackGround}></GlobalStyles>
          <FlexContainer
          >
              <header style={{ height: 80, display: "flex", justifyContent: "flex-end",alignItems: "center", padding: "0 100px 0 0"}}>
                    {nickname &&
                        <div>
                          <span style={{ color: "white", fontSize: "1.7rem", margin: "0 10px 0 0" }}>
                            {" "}
                            {nickname}님 Dollido에 오신걸 환영합니다
                          </span>
                          <Link to = {`/mypage`} style = {{textDecoration:"none"}}>
                            <Button2
                              color="orange"
                              size="medium"
                              onMouseEnter = {() => {
                                  selectSound();
                              }}
                            >
                              마이페이지
                            </Button2>
                          </Link>
                        </div>
                    }
              </header>
              <TabList>
                <h1 style = {{padding: "0 0 0 100px", color: "white", fontSize: "6rem", fontStyle: "italic", userSelect: "none"}}>게임 대기실</h1>
              </TabList>
              <Content>
                  <RoomListFrame>
                    <div style = {{display: "flex", justifyContent: "flex-end", margin: "0 0 5px 0"}}>
                            <div style = {{margin: "30px"}}>
                              <Button2
                                color="yellow"
                                onClick={handleMakeRoom}
                                onMouseEnter = {() => {
                                  selectSound();
                                }}
                              >
                                방만들기
                              </Button2>
                            </div>
                      </div>
                      <RoomTagList>
                        <RoomTag1>이름</RoomTag1>
                        <RoomTag2>방장</RoomTag2>
                        <RoomTag3>게임모드</RoomTag3>
                        <RoomTag4>인원</RoomTag4>
                      </RoomTagList>
                        {currentPosts(rooms).map((room) => {
                          // console.log(room)
                          return (
                              <RoomLinkList key={room[0]}
                                onClick = { () => selectRoom(room)}
                                onMouseEnter = {() => {
                                  selectSound();
                                }}
                                >
                                <RoomLink1>{room[1].roomName}</RoomLink1>
                                <RoomLink2>{room[1].members[0]? room[1].members[0].nickName : "없음" }</RoomLink2>
                                <RoomLink3>개인전</RoomLink3>
                                <RoomLink4>
                                  {room[1].members.length}/4
                                </RoomLink4>
                              </RoomLinkList>
                            );
                        })};
                        <PageControl>
                          <LeftTriangle onClick = {prevPage}></LeftTriangle>
                          <div style = {{display: "flex", flex:"1"}}></div>
                          <RightTriangle onClick = {() => nextPage(roomCount)}></RightTriangle>
                        </PageControl>
                  </RoomListFrame>
              </Content>
            </FlexContainer>
      {modal && (
          <LobbyModal
              modal={modal}
              width="550"
              height="550"
              video="true"
              element={
                  <div>
                      <div style={{ fontSize: "30px", color: "white", margin: "30px", display: "flex", justifyContent: "center"}}>웃어보세요^_^</div>
                      <Video ref = {videoRef}></Video>
                      <div style = {{display: "flex", justifyContent: "space-around"}}>
                        <div style = {{display: "flex", justifyContent: "center"}}>
                          <Link to = {`/room/${localStorage.roomLink}`} name = {localStorage.roomName} style = {{textDecoration:"none"}}>
                            <div style = {{margin: "30px"}}>
                              <Button2
                                onMouseUp = {enterGame}
                                color="yellow"
                              >
                                입장하기
                              </Button2>
                            </div>
                          </Link>
                        </div>
                        <div style = {{margin: "30px"}}>
                              <Button2
                                color="yellow"
                                onClick={backToLoomList}
                              >
                                나가기
                              </Button2>
                        </div>
                      </div>
                  </div>
              }
          />
      )}
    </ThemeProvider>
  );
};

export default Lobby;
