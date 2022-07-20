import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateVideos, deleteVideo, clearVideos } from "../../modules/videos";
import { Background } from "../common/Background.tsx";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import mainBackground from "../../images/mainBackground.gif";
import { useInterval } from "../common/usefulFuntions";
import axios from "axios";
import { ServerName } from "../../serverName";
import * as faceapi from 'face-api.js';
import BestPerformer from "./BestPerformer";

/* In Game 추가 사항 */
import LoadGIF from "./Giftest";
import Button from "../common/Button.js";
import { Link } from "react-router-dom";

const userId = "salmonsushi"; // 임시(temp)

const recordTime = 3000; // 녹화 시간(ms)
const modelInterval = 500; // 웃음 인식 간격(ms)
let startVideoPromise;
let videoRecorded = false; // 녹화 여부

/** 1초 줄어든 시간을 리턴 */
function decreaseOneSec(minutes, seconds) {
  if (seconds === 0) {
    seconds = 59;
    minutes -= 1;
  } else {
    seconds -= 1;
  }
  return [minutes, seconds];
}

function handleGameStart() {
  console.log("Game Start");
}


function ChattingWindow(props) {
  return <div style={{ width: "100%" }}>
    <h1>Chatting Window Here</h1>
  </div>
}

function GifWindow(props) {
  return <div>
    <h1>GIF Here</h1>
    <LoadGIF></LoadGIF>
  </div>
}


function Timer(props) {
  const gameMinutes = 1;
  const gameSeconds = 30;
  const [remainTime, setTimer] = useState([gameMinutes, gameSeconds]);
  const [minutes, seconds] = remainTime;

  let delay = 1000;
  let insertZero = '';
  let content = '';

  if (minutes === 0 && seconds === 0) { // 종료 조건
    content = <h1> Game Over! </h1>
    delay = null; // clear useInterval
  } else {
    if (seconds < 10) insertZero = '0';
    content = <h1> {'0' + remainTime[0] + ":" + insertZero + remainTime[1]} </h1>
  }

  useInterval(() => {
    setTimer(decreaseOneSec(remainTime[0], remainTime[1]));
  }, delay);

  return content;

}

// 녹화가 완료된 후 서버로 비디오 데이터 post
async function postVideo(recordedBlob) {
  // let file = new File([recordedChunks[0]], "userVideo");
  const formdata = new FormData();

  formdata.append('userId', userId);
  formdata.append('video', recordedBlob, 'video.mp4');

  console.log('Blob data : ', recordedBlob);

  await axios.post(`${ServerName}/api/best/send-video`, formdata, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then((res) => { console.log('POST res : ', res) })
    .catch((err) => { console.log('err : ', err) });
}


function recordVideo(stream) {
  console.log("Start Recording...");
  let recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    const recordedBlob = new Blob([event.data], { type: "video/mp4" });
    postVideo(recordedBlob);
  };

  recorder.start();
  setTimeout(() => {
    recorder.stop();
    console.log("Recording Finished!");
  }, recordTime);
}


const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: koverwatch
`

const Header = styled.div`
  display: flex;
  flex: 5;
  font-family: koverwatch
`

const Middle = styled.div`
  display: flex;
  flex: 80;
  width: 100%;
  font-family: koverwatch
`
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex: 15;
  font-family: koverwatch
`


function Videos({ match, socket }) {
  const dispatch = useDispatch();

  const userVideo = useRef();
  const userStream = useRef(); // 사용자의 stream

  const partnerVideos = useSelector((state) => state.videos);
  const peerRef = useRef(); // peer 객체 생성에 사용하는 임시 변수
  const otherUsers = useRef([]); // 다른 유저들의 userID를 저장
  const peers = useRef([]); // 다른 유저들의 peer들을 저장
  const { roomID } = useParams();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);


  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(getStream)
      .catch((err) => console.error(err));

    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    console.log("AI Model Loading...");
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(setModelsLoaded(true));

    return () => {
      socket.emit("out room");
      socket.off();
      userStream.current &&
        userStream.current.getTracks().forEach((track) => {
          track.stop();
        });
      userVideo.current = null;
      userStream.current = null;
      otherUsers.current = null;
      peers.current = null;
      dispatch(clearVideos());
    };
    // eslint-disable-next-line
  }, [socket, match]);


  const getStream = useCallback(
    (stream) => {
      userVideo.current.srcObject = stream;
      userStream.current = stream;
      socket.emit("join room", {
        roomID: roomID,
        streamID: stream.id,
        nickName: localStorage.nickname,
      });

      // 유저가 나갔을 때
      socket.on("out user", ({ nickname, streamID }) => {
        // alert(`${nickname} (이)가 나갔습니다!`);
        console.log(nickname + " out!");
        dispatch(deleteVideo(streamID));
      });

      // 새로 들어간 사람 입장에서 다른 사람 전부의 정보를 전해들음
      socket.on("other users", (usersID) => {
        usersID.forEach((userID) => {
          callUser(userID.socketID); // userID들은 이미 존재하던 사람들. 그 사람들에게 call
          otherUsers.current.push(userID);
        });
      });

      // 기존 사람들 입장에서 다른 유저가 들어왔음을 확인
      socket.on("user joined", (userID) => {
        otherUsers.current.push(userID);
      });
      socket.on("offer", handleRecieveCall); // Callee는 Caller의 offer을 들을 것
      socket.on("answer", handleAnswer);
      socket.on("ice-candidate", handleNewICECandidateMsg); // IceCandidate 정보를 서로 주고 받음
    },
    // eslint-disable-next-line
    [socket, match]
  );


  const callUser = useCallback(
    (userID) => {
      try {
        peerRef.current = null; // 임시 변수 초기화
        peerRef.current = createPeer(userID); // 상대방의 userID를 파라미터로 넘기며(협상 위해) peer 객체를 생성
        userStream.current // 상대방에게 offer하기 위해서 stream 정보를 peer의 track에 추가
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current)
          );
        peers.current.push(peerRef.current);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line
    [socket, match]
  );


  // 나 자신의 peer 객체를 생성하는데 상대방(userID)와의 offer, answer작업에 대한 콜백 함수를 설정
  const createPeer = useCallback(
    (userID) => {
      const peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.stunprotocol.org", // stun 서버
          },
          {
            urls: "turn:numb.viagenie.ca", // turn 서버
            credential: "muazkh",
            username: "webrtc@live.com",
          },
        ],
      });

      peer.onicecandidate = handleICECandidateEvent; // Ice Candidate 이벤트 발생시 정보 전송
      peer.ontrack = handleTrackEvent; // 상대방의 stream을 track에 추가
      peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID); // offer과 answer 작업

      return peer;
    },
    // eslint-disable-next-line
    [socket, match]
  );


  // Caller 입장에서 Offer을 제공(offer 이벤트를 emit)
  const handleNegotiationNeededEvent = useCallback(
    (userID) => {
      const index = otherUsers.current.findIndex(
        (otherUser) => otherUser.socketID === userID
      );
      const thePeer = peers.current[index];
      thePeer
        .createOffer()
        .then((offer) => {
          return thePeer.setLocalDescription(offer); // offer을 생성하고 해당 offer을 local description으로 설정
        })
        .then(() => {
          const payload = {
            target: userID,
            caller: socket.id,
            sdp: thePeer.localDescription,
          };
          socket.emit("offer", payload);
        })
        .catch((err) => console.error(err));
    },
    // eslint-disable-next-line
    [socket, match]
  );


  // Callee 입장에서 'offer' 이벤트를 listen했을 때
  const handleRecieveCall = useCallback(
    (incoming) => {
      peerRef.current = null;
      peerRef.current = createPeer(); // negotiate을 하는 Caller의 입장이 아니므로 상대방 userID를 보낼 필요 없음
      peers.current.push(peerRef.current);
      const maxNum = peers.current.length;
      const thePeer = peers.current[maxNum - 1];
      const desc = new RTCSessionDescription(incoming.sdp);
      thePeer
        .setRemoteDescription(desc)
        .then(() => {
          userStream.current.getTracks().forEach(
            (track) => thePeer.addTrack(track, userStream.current) // 상대방에게 나의 stream 정보를 answer하기 위해 peer에 track 정보추가
          );
        })
        .then(() => {
          return thePeer.createAnswer();
        })
        .then((answer) => {
          return thePeer.setLocalDescription(answer); // offer와 유사하게 sdp 정보를 가지고 있음
        })
        .then(() => {
          const payload = {
            target: incoming.caller,
            caller: socket.id,
            sdp: thePeer.localDescription,
          };
          socket.emit("answer", payload);
        })
        .catch((err) => console.error(err));
    },
    // eslint-disable-next-line
    [socket, match]
  );

  // Caller 입장에서 Callee의 answer을 받았을 때
  const handleAnswer = useCallback(
    (message) => {
      try {
        const desc = new RTCSessionDescription(message.sdp);
        const index = otherUsers.current.findIndex(
          (otherUser) => otherUser.socketID === message.caller
        );
        const thePeer = peers.current[index];
        thePeer.setRemoteDescription(desc).catch((e) => console.log(e));
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line
    [socket, match]
  );

  // Ice Candidate 정보는 서로 주고 받음
  // Ice Candidate 이벤트가 발생하면 상대방에게 해당 정보를 전송
  const handleICECandidateEvent = useCallback(
    (e) => {
      if (e.candidate) {
        const payload = {
          caller: socket.id,
          candidate: e.candidate,
          roomID: roomID,
        };
        socket.emit("ice-candidate", payload);
      }
    },
    // eslint-disable-next-line
    [socket, match]
  );

  // Ice Cnadidate 이벤트가 발생해서 상대방이 해당 정보를 전송하면, 그 정보를 받음
  const handleNewICECandidateMsg = useCallback(
    (incoming) => {
      const candidate = new RTCIceCandidate(incoming.candidate);
      const index = otherUsers.current.findIndex(
        (otherUser) => otherUser.socketID === incoming.caller
      );
      const thePeer = peers.current[index];
      thePeer
        .addIceCandidate(candidate)
        .catch((e) => console.log("ICE 에러\n" + e));

    },
    // eslint-disable-next-line
    [socket, match]
  );

  const handleTrackEvent = useCallback(
    (e) => {
      dispatch(updateVideos(e.streams[0])); // redux에 새로운 유저 video stream state를 update하는 함수 dispatch
    },
    // eslint-disable-next-line
    [socket, match]
  );



  //InGame
  const [gameStarted, setGameStart] = useState(false);

  function handleHP(happiness) {
    if (happiness > 0.2) { // 피를 깎아야 하는 경우
      if (happiness > 0.6) {
        if (!videoRecorded) { // 딱 한 번만 record
          videoRecorded = true;
          recordVideo(userVideo.current.srcObject);
        }
        return 2;
      } else {
        return 1;
      }
    }
    return 0;
  }

  const ShowStatus = () => {
    const [myHP, setMyHP] = useState(100);
    const [faceDetected, setFaceDetected] = useState(false);
    const [smiling, setSmiling] = useState(false);
    const [interval, setInterval] = useState(modelInterval);
    let content = "";

    /** 모델 돌리기 + 체력 깎기 */
    useInterval(async () => {
      const detections = await faceapi.detectAllFaces(userVideo.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
      if (detections[0]) {
        const decrease = handleHP(detections[0].expressions.happy);
        if (decrease > 0) {
          const newHP = myHP - decrease;
          if (newHP <= 0) { // game over
            setInterval(null);
          }
          setMyHP(newHP);
          setSmiling(true);
        } else setSmiling(false);
        setFaceDetected(true);
      } else {
        setFaceDetected(false);
        setSmiling(false);
      }
    }, interval);

    let detecContent = faceDetected ? "인식 중" : "인식 불가";

    if (interval) {
      content = <h2 style={HPstyle}>{detecContent}  HP : {myHP} {smiling && "^^"}</h2>
    } else {
      content = <h2 style={HPstyle}> Game Over!!! </h2>
    }

    return content
  }


  function handleStart(event) {
    setGameStart(!gameStarted);
    handleGameStart();
  }

  function handleFinish() {
    console.log("Game Finished");
    setGameFinished(true);
  }

  // function OtherVideoPlay(partnerVideos, otherUsers) {
  //   const playerNickname = useRef()


  //   partnerVideos.map((partnerVideo) => (

  //     otherUsers.current.map((otherUser, index) => 
  //     otherUser.streamID === partnerVideo.id ? (
  //       otherUser.nickName ? playerNickname.current = otherUser.nickName : index
  //     ) : null )
  //   ))


  //   return playerNickname

  // }



  const HeaderStyle = {

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'


  }

  const HeaderLeft = {

    flex: "2.5",
    textAlign: "Center",
    color: 'gray',
    backgroundColor: 'White'


  }
  const HeaderMiddle = {

    flex: "5",
    textAlign: "Center",
    color: 'gray',
    backgroundColor: 'Black'


  }
  const HeaderRight = {

    flex: "2.5",
    textAlign: "Center",
    color: 'gray',
    backgroundColor: 'White'

  }

  const MiddleLeft = {
    flex: "2.5",
    textAlign: "Center",
    display: "flex",
    flexDirection: "Column"
    // backgroundColor: "beige"
  }

  const Middlemiddle = {
    flex: "5",
    backgroundColor: "beige",
    textAlign: "Center"

  }
  const MiddleRight = {

    flex: "2.5",
    textAlign: "Center",
    display: "flex",
    flexDirection: "Column"
  }

  const MyNickname = {

    alignItems: 'flex-end',
    justifyContent: 'center',
    color: 'gray'

  }

  const MyVideo = {

    flex: '5',
    // height:"auto",
    width: "100%",
    transform: 'scaleX(-1)',

  }

  const MyButton = {
    flex: '3',
    display: "flex",
    justifyContent: 'center',
    textAlign: "center",
    alignItems: 'center'
  }

  const ButtonSize = {

    margin: "25px"
  }

  const OthersVideoStyle = {

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'

  }

  const OthersVideoBox = {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center'
    // justifyContent: 'space-around'
  }

  const OtherNickname = {
    color: 'gray',
    flex: "1"
  }


  const HPstyle = {
    color: 'gray'
  }

  const playerBox = {
    flex: "5"
  }




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
          <FlexContainer>

            <Header>
              <div style={HeaderStyle}>
                <div style={HeaderLeft}>
                  <h1> {localStorage.roomName}</h1>
                </div>
                <div style={HeaderMiddle}>
                  {!gameStarted ? <h1>DOLLIDO</h1> : <Timer></Timer>}
                </div>
                <div style={HeaderRight}>
                  <h1> Mode </h1>
                </div>
              </div>
            </Header>
            <Middle>
              <div style={MiddleLeft}>
                <div style={playerBox}>
                  <h1 style={MyNickname}>{localStorage.nickname}</h1>
                  <video autoPlay style={MyVideo} ref={userVideo} />
                  {modelsLoaded ? <ShowStatus></ShowStatus> : <h1> Model Loading... </h1>}
                </div>
                <div style={playerBox}>
                  <h1 style={{ color: "gray" }}>{otherUsers.current[1] ? otherUsers.current[1].nickName : "Undefined"}</h1>
                  <Video stream={partnerVideos[1]}></Video>
                  <h2 style={HPstyle} >HP : 100</h2>
                </div>
              </div>
              <div style={Middlemiddle}>
                {gameStarted ?
                  gameFinished ?
                    <BestPerformer></BestPerformer> :
                    <GifWindow></GifWindow> :
                  <ChattingWindow></ChattingWindow>}
              </div>
              <div style={MiddleRight}>
                <div style={playerBox} >
                  <h1 style={{ color: "gray" }}>{otherUsers.current[0] ? otherUsers.current[0].nickName : "Undefined"}</h1>
                  <Video stream={partnerVideos[0]}></Video>
                  <h2 style={HPstyle} >HP : 100</h2>
                </div>
                <div style={playerBox} >
                  <h1 style={{ color: "gray" }}>{otherUsers.current[2] ? otherUsers.current[2].nickName : "Undefined"}</h1>
                  <Video stream={partnerVideos[2]}></Video>
                  <h2 style={HPstyle} >HP : 100</h2>
                </div>
              </div>

            </Middle>
            <Bottom>
              <div style={MyButton}>
                <Button color="yellow" size="large" style={ButtonSize} onClick={handleStart}>START</Button>
                <Link to="/Lobby">
                  <Button color="yellow" size="large" style={ButtonSize}>
                    QUIT
                  </Button>
                </Link>
                <Button color="yellow" size="large" style={ButtonSize} onClick={handleFinish}>
                  FINISH GAME
                </Button>
              </div>

            </Bottom>
          </FlexContainer>

        }>

      </Background>
    </ThemeProvider>
  );
};



const Video = ({ stream }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.srcObject = stream;
  }, [stream]);
  return <video style={{ width: "100%", transform: 'scaleX(-1)' }} autoPlay ref={ref} />;
};

export default React.memo(Videos); // 메모이징 최적화
