import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { ThemeProvider } from "styled-components";
import { v4 as uuid } from "uuid";

import Button2 from "../common/Button2.js";
import { LobbyModal } from "../common/LobbyModal.tsx";
import mainBackGround from "../../images/mainBackground.gif";
import { Background } from "../common/Background.tsx";
import styled from "styled-components";
import { GlobalStyles } from "../common/Global.ts";

import { ServerName } from "../../serverName";

// 임시
import { useSelector } from "react-redux";

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
  font-size: 1.5rem;
  user-select: none;
  background-color: #5F95C7BB;
`

const RoomTag1 = styled.div`
  display: flex;
  flex: 4;
  border-right: 2px solid #16364A79;
  box-sizing: border-box;
  color: white;
  padding: 10px;
`
const RoomTag2 = styled.div`
  display: flex;
  flex: 3;
  border-right: 2px solid #16364A79;
  box-sizing: border-box;
  color: white;
  padding: 10px;
`
const RoomTag3 = styled.div`
  display: flex;
  flex: 2;
  border-right: 2px solid #16364A79;
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
  font-size: 20px;
  padding: 10px;
  margin: 2px 0 2px 0;
  cursor: pointer;
  list-style: none;
  &:hover {
    background-color: #FFD124C9;
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
  // 임시
  const nickname = useSelector((state) => state.member.member.user_nick);

  /* 방 만들기 & 입장 */
  const SERVER_ADDRESS = useRef(ServerName);
  const socket = useRef();
  const roomNameRef = useRef(null);
  const [rooms, setRooms] = useState({});
  const [roomName, setRoomName] = useState("");
  const [roomCount, setRoomCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

  // 1. 방 리스트 받아오기
  useEffect(() => {
    socket.current = io(SERVER_ADDRESS.current, {
      withCredentials: false,
      extraHeaders: {
        "dollido-header": "dollido",
      },
    });
    socket.current.emit("get room list");
    
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

  // 방 생성 절차
  const onChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value);
  }, []);

  const onClickMakeRoom = useCallback(
    (e) => {
      e.preventDefault();
      // 2-1. 방제 없을 시, 생성 불가
      if (roomName === "") {
        alert("방 이름을 입력하세요");
        return;
      }
      // 2-2. 방 중복 시, 생성 불가
      let roomNameCheck = false;
      Object.entries(rooms).map((room) => {
        if (room[1].roomName === roomName) {
          alert("이미 있는 방 이름입니다 !");
          roomNameRef.current.value = "";
          roomNameCheck = true;
          return;
        }
      });
      // 2-3. 방 생성, 방이름과 방ID 서버에 전달
      if (!roomNameCheck) {
        socket.current.emit("make room", { roomName, roomID: uuid() });
        alert(`${roomName} 방이 생성되었습니다`);
        setRoomName("");
        roomNameRef.current.value = "";
      }
    },
    [roomName, rooms]
  );

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


  const backToLoomList = () => {
    setModal(false);
    stopWebcam();
  };

  const sizes = {
    height: "36px",
    fontSize: "1rem",
    border: "1px solid transparent",
    margin: "0 2px 0 0"
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
      <FlexContainer>
          <header style={{ height: 80, display: "flex", justifyContent: "flex-end",alignItems: "center", padding: "0 100px 0 0"}}>
                {nickname &&
                    <div>
                      <span style={{ color: "white" }}>
                        {" "}
                        {nickname}님 Dollido에 오신걸 환영합니다
                      </span>
                    </div>
                } 
          </header>
          <TabList>
            <h1 style = {{padding: "0 0 0 100px", color: "white", fontSize: "60px", fontStyle: "italic", userSelect: "none"}}>게임 대기실</h1>
          </TabList>
          <Content>
              {/* <UserInfo>
                <h1 style = {{color: "white"}}>유저정보 들어갈 곳</h1>
              </UserInfo> */}
              <RoomListFrame>
                <div style = {{display: "flex", justifyContent: "flex-end", margin: "0 0 5px 0"}}>
                    <input
                      type="text"
                      placeholder="방이름을 입력하세요"
                      name="roomName"
                      value={roomName}
                      onChange={onChangeRoomName}
                      onKeyPress= {(e) => {
                        e.key === "Enter" && onClickMakeRoom(e);
                      }}
                      ref={roomNameRef}
                      style={sizes}
                    />
                    <Button2
                      color="orange"
                      size="medium"
                      onClick={onClickMakeRoom}
                    >
                      방만들기
                    </Button2>
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
                          <RoomLinkList key={room[0]} onClick = { () => selectRoom(room) }>
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
                                color="yellow"
                              >
                                입장하기
                              </Button2>
                            </div>
                          </Link>
                        </div>
                        <div style = {{margin: "30px"}}>
                              <Button2
                                color="yellow" onClick={backToLoomList}
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
