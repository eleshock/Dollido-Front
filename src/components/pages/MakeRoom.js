import { useEffect, useState, useRef, useCallback } from "react";
import { Background } from "../common/Background.tsx";
// import "../common/RoomMode.css"
import mainBackGround from "../../images/mainBackground.gif";
import ModeOne from "../../images/ModeOne.jpeg";
import ModeTwo from "../../images/ModeTwo.png";
import ModeThree from "../../images/ModeThree.webp";
import styled from "styled-components";
import { darken, lighten } from "polished";

import Button2 from "../common/Button2.js";
import { ThemeProvider } from "styled-components";
import { Modal } from "../common/Modal.tsx";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";
import { ServerName } from "../../serverName";

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
`;

const pagetitle = {
  padding: "25px 0 0 0",
  color: "white",
  fontSize: "6rem",
  fontStyle: "italic",
  userSelect: "none",
  // textAlign: "center"
};

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
  textAlign: "center",
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
  width: "60%",
  height: "36px",
  fontSize: "1rem",
  border: "1px solid transparent",
  margin: "0 50px 0 0",
};

let startVideoPromise;

function MakeRoom() {
  const SERVER_ADDRESS = useRef(ServerName);
  const [modal, setModal] = useState(false);
  const [modeone, setModeOne] = useState(false);
  const [modetwo, setModeTwo] = useState(false);
  const [modethree, setModeThree] = useState(false);
  const [roommode, setRoomMode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState({});
  const [change, setChange] = useState(true);

  const socket = useRef();
  const roomNameRef = useRef(null);

  const onClickGoBack = useCallback((e) => {
    e.preventDefault();
    window.location.href = "/lobby";
  }, []);

  const onClickMode = (params, e) => {
    console.log(params);
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
    }
  };

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
    };
  }, []);
  useEffect(() => {
    socket.current.on("give room list", (rooms) => {
      setRooms(rooms);
    });
  }, [rooms]);

  // 2. 방 생성 절차

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
        console.log("hihi3");
        return;
      }
      const roomID = uuid();
      console.log(roomID);
      localStorage.roomLink = roomID;
      // 2-3. 방 생성, 방이름과 방ID 서버에 전달
      socket.current.emit("make room", { roomName, roomID });
      //    alert(`${roomName} 방이 생성되었습니다`);
      setRoomName("");
      console.log("hihi4");
      roomNameRef.current.value = "";
      window.location.href = "/room/" + roomID;
    },
    [roomName, rooms]
  );

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
        console.log(typeof stream);
        console.log(startVideoPromise);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopWebcam = () => {
    startVideoPromise.then((stream) => {
      console.log("Video Stopped");
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    });
  };

  return (
    <ThemeProvider
      theme={{
        palette: {
          yellow: "#E5B941",
        },
      }}
    >
      <Background
        background={mainBackGround}
        element={
          <div style={FlexContainer}>
            <div style={Header}>
              {/* <h1 style={pagetitle}>Mode</h1>           */}
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
            </div>
          </div>
        }
      />

      {modal && (
        <Modal
          modal={modal}
          setModal={setModal}
          setChange={setChange}
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
                <Button2 color="yellow" size="medium" onClick={onClickMakeRoom}>
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
