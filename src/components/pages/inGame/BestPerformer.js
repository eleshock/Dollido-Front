import axios from "axios";
import { useState, useEffect } from "react";
import { ServerName } from "../../../serverName";

let response;

// Blob(Binary Large Object) : JS에서 이미지, 사운드, 비디오 같은 멀티미디어 데이터를 다룰 때 사용
// webm : 웹에서 돌아가는 동영상 확장자
function BestPerformer() {
    const [gotVideo, setGotVideo] = useState(false);
    let content = '';
    console.log("Show Best Performer");

    useEffect(() => {
        // Best Performer Nick과 비디오 얻어오기
        async function getLoserVideo() {
            response = await axios.get(`${ServerName}/api/best/get-video`)
                .then(res => res)
                .catch(() => null);
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
                content = <h1> 한 번도 웃지 않으셨군요! </h1>
            } else {
                const videoUrl = ServerName + '/' + bestVideoName;

                content = <>
                    <h1> { bestPerformerNick } </h1>
                    <video src={ videoUrl } autoPlay loop
                        style={{ borderRadius: '10px', width: "90%", transform: 'scaleX(-1)' }} />
                </>
            }
        }
    }

    return <>
        <div style={{ margin: '0 0 0 0' }}>
            <h1>Best Performer!</h1>
            {content}
        </div>
    </>
}

export default BestPerformer;