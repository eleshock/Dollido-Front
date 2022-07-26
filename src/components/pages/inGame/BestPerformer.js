import axios from "axios";
import { useState, useEffect } from "react";
import { ServerName } from "../../../serverName";
import Typewriter from "typewriter-effect";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setBestDone } from "../../../modules/inGame";
import firework from "../../../images/fireworks/firework_7.gif";

let response;

const Container = styled.div`
    align-items: center;
    color: white;
    text-align: center;
    font-size: 78px;
`

// Blob(Binary Large Object) : JS에서 이미지, 사운드, 비디오 같은 멀티미디어 데이터를 다룰 때 사용
// webm : 웹에서 돌아가는 동영상 확장자
function BestPerformer(props) {
    const dispatch = useDispatch();
    const [gotVideo, setGotVideo] = useState(false);
    const [typedone, setTypeDone] = useState(false);
    let content = '';
    console.log("Show Best Performer");

    useEffect(() => {
        // Best Performer Nick과 비디오 얻어오기
        async function getLoserVideo() {
            const data = { roomID: props.roomID };
            response = await axios.post(`${ServerName}/api/best/get-video`, data)
                .then(res => res)
                .catch((err) => {
                    console.log(err);
                    return null;
                });
            console.log("response : ", response);
            setGotVideo(true);
        }
        getLoserVideo();
    }, [])

    if (!gotVideo) {
        content = <h1> 로딩중... </h1>
    } else {
        if (response === null) {
            content = <h1> 오류가 발생했습니다 </h1>
        } else {
            const bestPerformerNick = response.data.bestPerformerNick;
            const bestVideoName = response.data.bestVideoName;

            console.log("Best Performer Nick :", bestPerformerNick);
            console.log("Best Video Name :", bestVideoName);

            if (bestVideoName === undefined) {
                content =
                    <>
                        <h1> {bestPerformerNick} </h1>
                        <h1> 비디오가 기록되지 않았습니다 😢 </h1>
                    </>
            } else {
                const videoUrl = ServerName + '/' + bestVideoName;

                content = <>
                    <div> {bestPerformerNick}! </div>
                    <video src={videoUrl} autoPlay loop
                        style={{ margin: '40 0 0 0', borderRadius: '10px', width: "90%", transform: 'scaleX(-1)' }} />
                    <img src={firework} style={{position:"absolute", width:"auto", height:"auto", top:"0%", left:"15%" }}></img>
                    <img src={firework} style={{position:"absolute", width:"auto", height:"auto", top:"0%", right:"15%", transform: "scaleX(-1)" }}></img>
                </>
            }
        }
    }

    return <>
        <Container>
            {!typedone ? <Typewriter
                options={{ cursor: '|', delay: '120', deleteSpeed: '5' }}
                onInit={(typewriter) => {
                    typewriter.typeString("Game Over")
                        .pauseFor(1000)
                        .deleteAll()
                        .changeDelay(60)
                        .typeString("Best Performer is...")
                        .pauseFor(1500)
                        .callFunction(() => {
                            setTypeDone(true)
                            setTimeout(() => {
                                dispatch(setBestDone(true));
                            }, 5000)
                        })
                        .start();
                }} /> :
                content}
        </Container>
    </>
}

export default BestPerformer;