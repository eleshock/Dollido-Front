import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from 'react-redux';
import { ServerName } from "../../../serverName";
import { s3Domain } from "../../../s3Domain";

async function getVideoInfo(token) {
	const headers = { headers: { token: token } }
	const response = await axios.get(`${ServerName}/api/best/my-videos`, headers)
		.then((res) => res)
		.catch(() => null);
	console.log(response);
	return response.data
}

function nextVideo(clickNext, nowVideo, setNowVideo, numOfVideos) {
	if (clickNext) {
		if (nowVideo === numOfVideos - 1) {
			alert("마지막 영상입니다.");
			return;
		}
		setNowVideo(nowVideo + 1);
	} else {
		if (nowVideo === 0) {
			alert("첫번째 영상입니다.");
			return;
		}
		setNowVideo(nowVideo - 1);
	}
}

const VideoLibrary = () => {
	const [nowVideo, setNowVideo] = useState(0);
	const [gotVideoInfo, setGotVideoInfo] = useState(false);
	const token = useSelector((state) => state.member.member.tokenInfo.token);
	const myVideosInfo = useRef();
	let videoUrl;

	useEffect(() => {
		const getVideos = async () => {
			myVideosInfo.current = await getVideoInfo(token);
			setGotVideoInfo(true);
		}
		getVideos();
	}, [])

	let timeSource = "2020-10-05T09:00:00.000Z"
	let dateObj = new Date(timeSource);
	let timeString_KR = dateObj.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

	if (gotVideoInfo) {
		videoUrl = s3Domain + myVideosInfo.current[nowVideo].server_name;
	}

	return (
		<div>
			<button onClick={() => nextVideo(false, nowVideo, setNowVideo)}> 이전 </button>
			{gotVideoInfo &&
				<video src={videoUrl} autoPlay loop
					style={{ margin: '40 0 0 0', borderRadius: '10px', width: "90%", transform: 'scaleX(-1)' }} />}
			<button onClick={() => nextVideo(true, nowVideo, setNowVideo, myVideosInfo.current.length)}> 다음 </button>
		</div>
	)
}

export default VideoLibrary;