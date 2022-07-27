import { useEffect, useState, useRef, useCallback } from "react";
import { Background } from "../common/Background.tsx";
// import "../common/RoomMode.css"
import mainBackGround from "../../images/mainBackground.gif";
import ModeOne from "../../images/ModeOne.jpeg";
import ModeTwo from "../../images/ModeTwo.png";
import ModeThree from "../../images/ModeThree.webp";
import styled from "styled-components";

import Button2 from "../common/Button2.js";
import { ThemeProvider } from "styled-components";
import { MakeRoomModal } from "../common/MakeRoomModal.tsx";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";
import { ServerName } from "../../serverName";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FlexContainer = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  fontFamily: "koverwatch",
};
const Header = {
  flex: "1",
  color: "white",
  textAlign: "left",
};

const Middle = {
  flex: "7",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
};

const Bottom = {
  flex: "2",
  // textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
};

const Content = styled.div`
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 25px 50px 0 #f4dbf4;
  }
`;

const Modeimage = styled.img`
  &:hover {
  }
`;
const GradationTitle = styled.h1`
  margin: 10px 0 10px 0;
  color: white;
  font-size: 4rem;
  font-style: italic;
  user-select: none;
  background: linear-gradient(to right top, #ffffff, #ffffff);
  //   -webkit-text-stroke: 3px black;
  color: transparent;
  -webkit-background-clip: text;
`;
const Video = styled.video`
  display: block;
  margin: 0 auto;
  width: 450px;
  height: 340px;
  transform: scaleX(-1);
`;

const modename = {
  // color: "black",
  // backgroundColor: "white",
  // fontStyle: "italic",
  // margin: "0 0 0 0"
};
const modecontent = {
  color: "black",
  backgroundColor: "#FFFFFF",
  padding: "20px 0 20px 0",
  margin: "0 0 0 0",
};

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
  color: "white",
};

const RoomModalMiddle = {
  flex: "8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const RoomModalBottom = {
  flex: "1",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
};

const sizes = {
  width: "48%",
  height: "36px",
  fontSize: "1rem",
  border: "1px solid transparent",
  margin: "0 50px 0 0",
};

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
  &:hover {
    transform: scale(1.2);
    color: white;
  }
`;

let startVideoPromise;

function MakeRoom() {
  const SERVER_ADDRESS = useRef(ServerName);
  const [modal, setModal] = useState(false);
  const [roommode, setRoomMode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [change, setChange] = useState(true);
  const [stop, setStop] = useState(false);

  const socket = useRef();
  const roomNameRef = useRef(null);

  
  const onClickMode = (params, e) => {
    e.preventDefault();
    switch (params) {
      case "One":
        localStorage.roommode = "혼자하기";
        setRoomMode("혼자하기");
        setModal(true);
        startVideo();
        return;
      case "Two":
        localStorage.roommode = "개인전";
        setRoomMode("개인전");
        setModal(true);
        startVideo();
        return;
      case "Three":
        localStorage.roommode = "팀전";
        setRoomMode("팀전");
        setModal(true);
        startVideo();
        return;
      default:
        return;
        
      }
    };
  useEffect(() => {
    if (stop) {
      stopWebcam();
    }
  }, [stop])

    // 소켓 연결
  useEffect(() => {
    socket.current = io(SERVER_ADDRESS.current, {
      withCredentials: false,
      extraHeaders: {
        "dollido-header": "dollido",
      },
    });
    return () => {
      stopWebcam();
    }
  }, []);

  // 2. 방 생성 절차
  
  const onChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value);
    localStorage.roomName = e.target.value;
  }, []);
  
  const navigate = useNavigate();
  const onClickMakeRoom = useCallback(
    (e) => {
      e.preventDefault();
      // 2-1. 방제 없을 시, 생성 불가
      if (roomName === "") {
        alert("방 이름을 입력하세요");
        return;
      }
      const roomID = uuid();
      console.log(roomID);
      localStorage.roomLink = roomID;
      // 2-3. 방 생성, 방이름과 방ID 서버에 전달
      socket.current.emit("make room", { roomName, roomID });
      alert(`${roomName} 방이 생성되었습니다`);
      setRoomName("");
      roomNameRef.current.value = "";
      navigate(`/room/${roomID}`);
    },
    [roomName]
  );

  const stopWebcam = () => {
    if (startVideoPromise) {
      startVideoPromise.then((stream) => {
        stream.getTracks().forEach((track) => {
          console.log(track)
          track.stop();
        });
      });
    }
  };

  // 비디오 가져오기
  const videoRef = useRef();

  const startVideo = (deviceId) => {
    startVideoPromise = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: deviceId ? { deviceId } : true,
    });
    console.log("camera loaded");
    startVideoPromise
    .then((stream) => {
      let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
    setStop(false);
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
      <Background
        background={mainBackGround}
        element={
          <div style={FlexContainer}>
            <div style={Header}>
            </div>
            <div style={Middle}>
              <Content
                onClick={(e) => {
                  onClickMode("One", e);
                }}
              >
                <GradationTitle style={modename}>혼자하기</GradationTitle>
                <Modeimage src={ModeOne} />
                <h2 style={modecontent}>혼자서도 즐겨보세요 !</h2>
              </Content>
              <Content
                onClick={(e) => {
                  onClickMode("Two", e);
                }}
              >
                <GradationTitle style={modename}>개인전</GradationTitle>
                <Modeimage src={ModeThree} />
                <h2 style={modecontent}>
                  실시간 웃음 참기(최대 4인) 즐겨보세요 !
                </h2>
              </Content>
              <Content
                onClick={(e) => {
                  onClickMode("Three", e);
                }}
              >
                <GradationTitle style={modename}>팀전</GradationTitle>
                <Modeimage src={ModeTwo} />
                <h2 style={modecontent}>팀을 이루어 즐겨보세요 !</h2>
              </Content>
            </div>
            <div style={Bottom}>
              <BackToLobby to={"/lobby"}>&lt; 뒤로가기</BackToLobby>
            </div>
          </div>
        }
      />

      {modal && (
        <MakeRoomModal
          modal={modal}
          setModal={setModal}
          setChange={setChange}
          setStop={setStop}
          width="700"
          height="600"
          video={startVideoPromise}
          element={
            <div style={ModalContainer}>
              <h1 style={RoomModalHeader1}>방만들기</h1>
              <h2 style={RoomModalHeader2}>웃어보세요 ^_^</h2>
              <div style={RoomModalMiddle}>
                <Video ref={videoRef}></Video>
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
                <Button2 color="orange" size="medium" onClick={onClickMakeRoom}>
                  방만들기
                </Button2>
              </div>
            </div>
          }
        />
      )}
    </ThemeProvider>
  );
}

export default MakeRoom;
