import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { ThemeProvider } from "styled-components";

import Button3 from "../common/Button3.js";
import mainBackGround from "../../images/mainBackground.gif";
import styled from "styled-components";
import { GlobalStyles } from "../common/Global.tsx";

import useSound from 'use-sound';

import {select, enterRoom, exit, playingSF, celebrateSF} from './Sound'

import { ServerName } from "../../serverName";

// 임시
import { MakeRoomModal } from "../common/MakeRoomModal.tsx";
import { v4 as uuid } from "uuid";

// 아이템 설명 버튼
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

//AI 모델
// face api import
import * as faceapi from 'face-api.js';
import { useInterval } from "../common/usefulFuntions";
import { useSelector, useDispatch } from "react-redux";
import { setInGameInit } from "../../modules/inGame.js";
import { setItemInit } from "../../modules/item.js";
import { setMemberInit } from "../../modules/member";

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
  border-radius:"10px";
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

const BackToLobby = styled(Link)`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: auto;
  height: auto;
  color: white;
  font-size: 2rem;
  padding: 3px;
  margin: 0 100px 0 0;
  text-decoration: none;
  background-color:transparent;
  &:hover {
    transform: scale(1.2);
    color: white;
  }
`;

// 방만들기 모달창
const ModalContainer = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  fontFamily: "koverwatch",
};

const RoomModalHeader1 = {
  margin: "10px 0 5px 0",
  flex: "1",
  textAlign: "center",
  color: "white",
};

const RoomModalHeader2 = {
  margin: "0 0 0 0",
  flex: "1",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  color: "white",
};

const RoomModalHeaderRed = {
  margin: "0 0 0 0",
  flex: "1",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  color: "red",
};

const RoomModalMiddle = {
  flex: "8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const RoomModalBottom = {
  flex: "1",
  justifyContent: "center",
  display: "flex"
};

const sizes = {
  width: "42%",
  height: "36px",
  fontSize: "1rem",
  border: "1px solid transparent",
  margin: "0 20px 0 0",
};



let startVideoPromise;

const Lobby = () => {
  console.log("1")
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
    exit, {
      volume: 0.5
    }
  );

  // 임시
  const nickname = useSelector((state) => state.member.member.user_nick);

  /* 방 만들기 & 입장 */
  // const SERVER_ADDRESS = useRef(ServerName);
  const socket = io(ServerName);
  const [rooms, setRooms] = useState({});
  const [roomCount, setRoomCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [change, setChange] = useState(true);
  const [stop, setStop] = useState(false);
  const postsPerPage = 7;
  const dispatch = useDispatch();

  /* 방 만들기 */
  const [roomName, setRoomName] = useState("");
  const [makeroommodal, setmakeRoomModal] = useState(false);
  const roomNameRef = useRef(null);


  useEffect(() => {
    if (stop) {
      stopWebcam();
    }
  }, [stop])

  // 로비 입장
  // 1. 방 리스트 받아오기
  useEffect(() => {
    // socket.current = io(SERVER_ADDRESS.current);
    socket.emit("get room list");
    dispatch(setInGameInit());
    dispatch(setItemInit());
    return () => {
      socket.disconnect();
      stopWebcam();
    }
  }, []);

  useEffect(() => {
    socket.on("give room list", (rooms) => {
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
    videoNModelInit();
  };

   // 2. 방 생성 절차
  const [onVideo, setOnVideo] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const onClickStartRoom = useCallback((e) =>{
    e.preventDefault();
    setmakeRoomModal(true);
    startVideo();
    videoNModelInit();
  })

  const handleVideoOnPlay = () => {
    setOnVideo(true);
  }
  const onChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value);
    localStorage.roomName = e.target.value;
  }, []);

  const onClickMakeRoom = useCallback(
    (e) => {
      e.preventDefault();
      // 2-1. 방제 없을 시, 생성 불가
      if (roomName === "") {
        alert("방 이름을 입력하세요");
        return;
      }
      const roomID = uuid();
      // console.log(roomID);
      localStorage.roomLink = roomID;
      // 2-3. 방 생성, 방이름과 방ID 서버에 전달
      socket.emit("make room", { roomName, roomID});
      alert(`${roomName} 방이 생성되었습니다`);
      setRoomName("");
      roomNameRef.current.value = "";
      navigate(`/room/${roomID}`);
    },
    [roomName]
  );

  // 비디오 가져오기
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
    setStop(false);
    setModelsLoaded(false);
    setOnVideo(false);


  };


  const videoNModelInit = async () => {
        
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        // console.log("AI Model Loading...")
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]).then(setModelsLoaded(true));
  }

  


  function handleHP(happiness, myHP) {
    if(myHP >0)
      if (happiness > 0.2) { // 피를 깎아야 하는 경우
        if (happiness > 0.6) {
            return 2;
        } else {
            return 1;
        }
    }
    return 0;
}



const ShowStatus = () => {
  const [myHP, setMyHP] = useState(100);
  const [faceDetected, setFaceDetected]  = useState(false);
  const [smiling, setSmiling]  = useState(false);
  const [interval, setInterval] = useState(350);
  let content = "";
  
  useInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
      if (detections[0]) {
              const decrease = handleHP(detections[0].expressions.happy, myHP);
              if (decrease > 0) {
                  const newHP = myHP - decrease
                  if (newHP <= 0){ // game over
                      setInterval(null);
                  }
                  setMyHP(newHP);
                  setSmiling(true);
              } else setSmiling(false);
              setFaceDetected(true);
          } else {
              setFaceDetected(false)
              setSmiling(false);
          }
      }, interval);
      let detecContent = faceDetected ? "웃어 보세요!": "얼굴 인식이 되지 않았습니다.";
      if (faceDetected) {
          content = <h2 style={RoomModalHeader2} >{detecContent} </h2>
          if(smiling)
          content = <h2 style={RoomModalHeader2} > 웃음 인식 확인! </h2>
      } else {
          content = <h2 style={RoomModalHeaderRed}> {detecContent}</h2> 
      }
      return content
  }
  
  const logout = () => {
    dispatch(setMemberInit());
  }

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
                        <div style ={{ display:"flex", flexDirection:"row"}} >
                          <span style={{ color: "white", fontSize: "1.7rem", margin: "0 10px 0 0" }}>
                            {" "}
                            {nickname}님 Dollido에 오신걸 환영합니다
                          </span>
                          <Link to = {`/mypage`} style = {{textDecoration:"none"}}>
                            <Button3
                              style ={{ margin: "0 0 0 30px", display:"flex", height:"50px", alignItems: "center", fontSize:"30px", justifyContent:"center"}}  
                            >
                              마이페이지
                            </Button3>
                          </Link>
                          <Button3
                            style ={{ margin: "0 0 0 30px", display:"flex", height:"50px", alignItems: "center", fontSize:"30px", justifyContent:"center"}}
                            onClick={logout}
                          >
                            로그아웃
                          </Button3>
                        </div>
                    }
              </header>
              <TabList>
                <h1 style = {{padding: "0 0 0 100px", color: "white", fontSize: "6rem", fontStyle: "italic", userSelect: "none"}}>게임 대기실</h1>
              </TabList>
              <Content>
                  <RoomListFrame>
                    <div style = {{display: "flex", justifyContent: "flex-end", margin: "0 0 5px 0"}}>
                            <div >
                              <Button3
                                onClick = {onClickStartRoom}
                                style={{margin : "0 0 20px 0", fontSize:"30px", height:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}
                              >
                                방만들기
                              </Button3>
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
                  <div >
                      <BackToLobby to = {'/tutorial'} onMouseDown={exitSound} >
                        <FontAwesomeIcon style= {{background:"white", border: "none", outline: "none", color:"#F0A82BEE", borderRadius:"50%"}} icon={faQuestionCircle} size="2x"/>  
                      </BackToLobby>
                  </div>
              </Content>
            </FlexContainer>
      {modal && (
          <MakeRoomModal
              modal={modal}
              setModal={setModal}
              setChange={setChange}
              setStop={setStop}
              video={startVideoPromise}
              width="550"
              height="550"
              element={
                  <div style={ModalContainer}>
                      {!onVideo ? <h2 style={RoomModalHeader2}>model loading...</h2>: <ShowStatus ></ShowStatus>}
                      {/* <div style={{ fontSize: "30px", color: "white", margin: "30px", display: "flex", justifyContent: "center"}}>웃어보세요^_^</div> */}
                      <Video ref = {videoRef} onPlay = { handleVideoOnPlay }></Video>
                      <div style = {{display: "flex", justifyContent: "space-around"}}>
                        <div style = {{display: "flex", justifyContent: "center"}}>
                          <Link to = {`/room/${localStorage.roomLink}`} name = {localStorage.roomName} style = {{textDecoration:"none"}}>
                            <div style = {{margin: "30px"}}>
                              <Button3
                                style={{fontSize:"25px", display:"flex", justifyContent:"center", alignItems:"center", width:"11rem", height:"36px"}}
                              >
                                입장하기
                              </Button3>
                            </div>
                          </Link>
                        </div>
                        <div style = {{margin: "30px"}}>
                              <Button3
                                onClick={backToLoomList}
                                style={{fontSize:"25px", display:"flex", justifyContent:"center", alignItems:"center", width:"11rem", height:"36px"}}
                              >
                                나가기
                              </Button3>
                        </div>
                      </div>
                  </div>
              }
          />
      )}

  {makeroommodal && (
        <MakeRoomModal
          modal={makeroommodal}
          setModal={setmakeRoomModal}
          setChange={setChange}
          setStop={setStop}
          width="700"
          height="600"
          video={startVideoPromise}
          element={
            <div style={ModalContainer}>
              <h1 style={RoomModalHeader1}>방만들기</h1>
              {/* <h2 style={RoomModalHeader2}>웃어보세요 ^_^</h2> */}
              {!onVideo ? <h2 style={RoomModalHeader2}>model loading...</h2>: <ShowStatus ></ShowStatus>}
              <div style={RoomModalMiddle}>
              <Video ref={videoRef} onPlay = { handleVideoOnPlay }></Video>
              </div>
              <div style={RoomModalBottom}>
                <input
                  type="text"
                  placeholder="방이름을 입력하세요"
                  name="roomName"
                  value={roomName}
                  onChange={onChangeRoomName}
                  onKeyPress={(e) => {
                    e.key === "Enter" && onClickMakeRoom(e);
                  }}
                  ref={roomNameRef}
                  style={sizes}
                />
                <Button3 
                  style={{margin : "0 0 20px 0", fontSize:"25px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center"}}
                  onMouseUp = {enterGame}
                  onClick={onClickMakeRoom}
                >
                  방만들기
                </Button3>
              </div>
            </div>
          }
        />
      )}
    </ThemeProvider>
  );
};

export default Lobby;
