import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { ThemeProvider } from "styled-components";
import { v4 as uuid } from "uuid";

import Button from "../common/Button.js";
import mainBackground from "../../images/main_background.png";
import { Background } from "../common/Background.tsx";
import { ServerName } from "../../serverName";
import styled from "styled-components";


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
    console.log(e.target);
    localStorage.roomName = e.target.name;
    alert(`${localStorage.roomName} 방에 입장합니다!`);
  }, []);

  const flexContainer = {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  };

  const tablist = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
    backgroundColor: "gray",
  };

  const content = {
    display: "flex",
    flex: "1"
  };

  const userInfo = {
    display: "flex",
    flex: "none",
    width: "350px",
    backgroundColor: "#404040",
  };

  const roomListFrame = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "auto",
    padding: "30px"
  };

  const roomTagList = {
    display: "flex",
    justifyContent: "space-between",
    listStyle: "none",
    margin: 3,
    fontSize: "1.5rem",
  };

  const roomTag1 = {
    border: "1px solid white",
    boxSizing: "border-box",
    color: "white",
    backgroundColor: "blue",
    width: "40%",
    padding: "2px"
  };
  const roomTag2 = {
    border: "1px solid white",
    boxSizing: "border-box",
    color: "white",
    backgroundColor: "blue",
    width: "30%",
    padding: "2px"
  };
  const roomTag3 = {
    border: "1px solid white",
    boxSizing: "border-box",
    color: "white",
    backgroundColor: "blue",
    width: "20%",
    padding: "2px"
  };
  const roomTag4 = {
    display: "flex",
    justifyContent: "center",
    border: "1px solid white",
    boxSizing: "border-box",
    color: "white",
    backgroundColor: "blue",
    width: "10%",
    padding: "2px"
  };


  const roomLinkList = {
    display: "flex",
    justifyContent: "space-between",
    color: 'white', 
    border: "1px solid white",
    margin: 3,
    backgroundColor: "#bfbab079", 
    textDecoration: 'inherit',
    fontSize: "1.25rem",
    padding: "2px"
  };

  const roomLink1 = {
    display: "flex",
    listStyle: "none",
    width:"40%"
  };
  const roomLink2 = {
    display: "flex",
    listStyle: "none",
    width:"30%"
  };
  const roomLink3 = {
    display: "flex",
    listStyle: "none",
    width:"20%"
  };
  const roomLink4 = {
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    width:"10%"
  };

  const sizes = {
    height: "2.00rem",
    fontSize: "1rem",
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
          <div className = "container" style = {flexContainer}>
              <header style={{ backgroundColor: 'white', height: 80, display: "flex", justifyContent: "flex-end",alignItems: "center"}}>
                    {loggedNickname !== "" || localStorage.nickname ? (
                        <div>
                          <span style={{ color: "black" }}>
                            {" "}
                            {localStorage.nickname}님 Dollido에 오신걸 환영합니다.
                          </span>
                          <Button
                            color="yellow"
                            size="small"
                            onClick={onChangeNickname}
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
                        >
                          닉네임 생성
                        </Button>
                      </div>
                    )}
              </header>
              <div className = "tablist" style = {tablist}>
                <h1>게임 대기실</h1>
                <div>
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
                      >
                        방만들기
                      </Button>
                    </div>
              </div>
              <main className = "content" style = {content}>
                <div style = {content}>
                  <div style = {userInfo}>
                    <h1 style = {{color: "white"}}>유저정보 들어갈 곳</h1>
                  </div>
                    <ul style = {roomListFrame}>
                        <ul className="roomTag" style={roomTagList}>
                          <li style = {roomTag1}>이름</li>
                          <li style = {roomTag2}>방장</li>
                          <li style = {roomTag3}>게임모드</li>
                          <li style = {roomTag4}>인원</li>
                        </ul>
                      {Object.entries(rooms).map((room) => {
                        return (
                            <div key={room[0]}>
                                  <ul style={ roomLinkList }>
                                    <li style = { roomLink1 }>
                                    <Link onClick={onClickJoin} to = {`/room/${room[0]}`} name ={room[1].roomName}>
                                    {room[1].roomName}
                                    </Link>
                                    </li>
                                    <li style = { roomLink2 }>
                                    <Link onClick={onClickJoin} to = {`/room/${room[0]}`} name ={room[1].roomName}>
                                    방장이름
                                    </Link>
                                    </li>
                                    <li style = { roomLink3 }>
                                    <Link onClick={onClickJoin} to = {`/room/${room[0]}`} name ={room[1].roomName}>
                                    개인전
                                    </Link>
                                    </li>
                                    <li style = { roomLink4}>
                                    <Link onClick={onClickJoin} to = {`/room/${room[0]}`} name ={room[1].roomName}>
                                    {room[1].members.length}/4
                                    </Link>
                                    </li>
                                  </ul>
                            </div>
                        );
                      })}
                    </ul>
                  </div>
              </main>
            </div>
        }
      />
    </ThemeProvider>
  );
};

export default Lobby;
