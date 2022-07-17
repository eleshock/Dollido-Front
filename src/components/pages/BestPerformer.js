import { recordedChunks } from "./MyVideo";

// Blob(Binary Large Object) : JS에서 이미지, 사운드, 비디오 같은 멀티미디어 데이터를 다룰 때 사용
// webm : 웹에서 돌아가는 동영상 확장자
function BestPerformer() {
    let content = '';
    console.log("Show Best Performer");
    
    if (recordedChunks.length === 0) {
        content = <h1> 한 번도 웃지 않으셨군요! </h1>
    } else {
        const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(recordedBlob);
        content = <video src={videoUrl} autoPlay loop
            style={{ borderRadius: '10px', width: "90%", transform: 'scaleX(-1)' }} />
    }

    return <>
        <div style={{ margin: '0 0 0 0' }}>
            <h1>Best Performer!</h1>
            {content}
        </div>
    </>
}

export default BestPerformer;