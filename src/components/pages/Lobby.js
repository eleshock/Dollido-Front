import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { ThemeProvider } from "styled-components";
import { v4 as uuid } from "uuid";

import Button from "../common/Button.js";
import mainBackground from "../../images/main_background.png";
import { Background } from "../common/Background.tsx";

import { ServerName } from "../../serverName";

const Lobby = () => {
  /* 닉네임 생성 절차 */
  const [nickname, setNickname] = useState("");
  const [loggedNickname, setLoggedNickname] = useState("");

  const onCreateNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);
  const onClickNickname = useCallback(
    (e) => {
      e.preventDefault();
      localStorage.nickname = nickname;
      setLoggedNickname(nickname);
    },
    [nickname]
  );

  const onChangeNickname = useCallback((e) => {
    e.preventDefault();
    localStorage.removeItem("nickname");
    setLoggedNickname("");
    window.location.href = "/lobby";
  }, []);

  /* 방 만들기 */
  const SERVER_ADDRESS = useRef(ServerName);
  const socket = useRef();
  const roomNameRef = useRef(null);
  const [rooms, setRooms] = useState({});
  const [roomName, setRoomName] = useState("");

  // 방 리스트 받아오기
  useEffect(() => {
    socket.current = io(SERVER_ADDRESS.current, {
      withCredentials: false,
      extraHeaders: {
        "dollido-header": "dollido",
      },
    });
    socket.current.emit("get room list");
  }, []);
  console.log(socket);
  useEffect(() => {
    socket.current.on("give room list", (rooms) => {
      setRooms(rooms);
    });
  }, [rooms]);

  // 방 생성 절차
  const onChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value);
  }, []);

  const onClickMakeRoom = useCallback(
    (e) => {
      e.preventDefault();
      // 방제 없을 시, 생성 불가
      if (roomName === "") {
        alert("방 이름을 입력하세요");
        return;
      }
      // 방 중복 시, 생성 불가
      let roomNameCheck = false;
      Object.entries(rooms).map((room) => {
        if (room[1].roomName === roomName) {
          alert("이미 있는 방 이름입니다 !");
          roomNameRef.current.value = "";
          roomNameCheck = true;
          return;
        }
      });
      // 방 생성, 방이름과 방ID 서버에 전달
      if (!roomNameCheck) {
        socket.current.emit("make room", { roomName, roomID: uuid() });
        alert(`${roomName} 방이 생성되었습니다`);
        setRoomName("");
        roomNameRef.current.value = "";
      }
    },
    [roomName, rooms]
  );

  // 방 참가
  const onClickJoin = useCallback((e) => {
    localStorage.roomName = e.target.name;
    alert(`${e.target.name} 방에 입장합니다!`);
  }, []);

  const wrapper = {
    position: "absolute",
    left: "50%",
    top: "20%",
    transform: "translate(-50%, -50%)",
  };

  const sizes = {
    height: "2.00rem",
    fontSize: "1rem",
  };
  const middleStyle = {
    width: "50%",
    float: "left",
    height: 730,
    padding: 30,
    textAlign: "center",
    color: "white",
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
        background={mainBackground}
        element={
          <div>
            <h1
              style={{
                color: "white",
                position: "absolute",
                left: "45%",
                margin: 30,
              }}
            >
              Dollido
            </h1>
            <div className="NameRoomBox" style={wrapper}>
              {loggedNickname !== "" || localStorage.nickname ? (
                
                  <div>
                    <span style={{ color: "white" }}>
                      {" "}
                      {localStorage.nickname}님 Dollido에 오신걸 환영합니다.
                    </span>
                    <Button
                      color="yellow"
                      size="small"
                      onClick={onChangeNickname}
                      style={{ margin: 10 }}
                    >
                      닉네임 변경
                    </Button>
                  </div>
                
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    name={nickname}
                    onChange={onCreateNickname}
                    style={sizes}
                  />
                  <Button
                    color="yellow"
                    size="small"
                    onClick={onClickNickname}
                    style={{ margin: 10 }}
                  >
                    닉네임 생성
                  </Button>
                </div>
              )}
              <p>
                <input
                  type="text"
                  placeholder="방이름을 입력하세요"
                  name="roomName"
                  value={roomName}
                  onChange={onChangeRoomName}
                  ref={roomNameRef}
                  style={sizes}
                />
                <Button
                  color="yellow"
                  size="small"
                  onClick={onClickMakeRoom}
                  style={{ margin: 15 }}
                >
                  방만들기
                </Button>
              </p>
            </div>

            <h1
              style={{
                color: "white",
                position: "absolute",
                left: "43%",
                top: "27%",
                margin: 30,
              }}
            >
              Room List
            </h1>
            <div>
              <h1></h1>
            </div>
            <ul  style={{position: "absolute", left:"35%", top:"43%"}}>
              {Object.entries(rooms).map((room) => {
                return (
                    
                    <h1 key={room[0]}>
                    
                            <Link style={{ color: 'white', textDecoration: 'inherit'}}
                                onClick={onClickJoin}
                                to = {`/room/${room[0]}`}
                                name ={room[1].roomName}
                            >
                            {room[1].roomName},  {room[1].members.length}/4
                            </Link>
                    </h1>
                
                );
              })}
            </ul>
          </div>
        }
      />
    </ThemeProvider>
  );
};

export default Lobby;
