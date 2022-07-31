import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from 'react-redux';
import { ServerName } from "../../../serverName";
import { s3Domain } from "../../../s3Domain";
import { Modal } from "../../common/Modal.tsx"
import Button from "../../common/Button";


const GridContainer = styled.div`
	height: 60vh;
	display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2em;
	overflow-y: auto;
	overflow-x: hidden;
	text-align: center;
	font-family: koverwatch;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background-color: rgba(255, 255, 255,  0.1); //스크롤 배경 색
		border-radius: 100px;
	}
	
	&::-webkit-scrollbar-thumb {
		border-radius: 100px;
		border: 6px solid #8070d4;
		border-left: 0;
		border-right: 0;
		background-color: #8070d4; 
	}
`

const Video = styled.video`
	border-radius: 10%;
	width: 100%;
	transform: scaleX(-1);
	padding : 10px 10px 10px 10px;
	&:hover {
		cursor: pointer;
		transform: scale(1.05) scaleX(-1);
`

const ModalContainer = styled.div`
	text-align: center;
	color: white;
	font-family: koverwatch;
	// margin: auto;
`

const ModalVideo = styled.video`
	border-radius: 10%;
	width: 80%;
	transform: scaleX(-1);
	padding : 10px 10px 10px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`


async function getVideoInfo(token) {
	const headers = { headers: { token: token } }
	const response = await axios.get(`${ServerName}/api/best/my-videos`, headers)
		.then((res) => res)
		.catch(() => null);
	
	if (response) return response.data;
	else return null;
}


const downloadVideo = (videoUrl, video_name) => {
	const a = document.createElement('a');
	a.href = videoUrl;
	a.download = video_name;
	document.body.appendChild(a);
	a.click();
	a.remove();
};


async function deleteVideo(elem, token, myVideosInfo) {
	const headers = {
		headers: {
			'Content-Type': 'application/json',
			token: token
		}
	}
	const data = { video_id: elem.video_id, server_name: elem.server_name };
	const response = await axios.post(`${ServerName}/api/best/delete-video`, data, headers)
		.then((res) => res)
		.catch(() => null);
	/* console.log("video deletion response :", response); */

	myVideosInfo.current = myVideosInfo.current.filter(e => e.video_id !== elem.video_id);
	
	if (response !== null) {
		alert("삭제 성공!");
	} else {
		alert("삭제 실패");
	}
}


// 비디오 클릭했을 때 모달창에 뜨는 내용 구성
function handleVideo(modal, setModal, setModalContent, elem, token, myVideosInfo) {
	const videoUrl = s3Domain + elem.server_name;
	let dateObj = new Date(elem.creation_date);
	let timeString_KR = dateObj.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
	const content = (
		<ModalContainer>
			<h3>{timeString_KR}</h3>
			<ModalVideo autoPlay loop src={videoUrl}></ModalVideo>
			<Bottom>
				<Button style={{ width: '100px', height: '40px', margin: 'auto', fontSize: '24px' }}
					onClick={() => downloadVideo(videoUrl, elem.video_name)}>다운로드</Button>
				<Button style={{ width: '100px', height: '40px', margin: 'auto', fontSize: '24px' }}
					onClick={() => deleteVideo(elem, token, myVideosInfo)}>영상 삭제</Button>
			</Bottom>
		</ModalContainer>)
	setModalContent(content);
	setModal(!modal);
}



const VideoLibrary = () => {
	const [gotVideoInfo, setGotVideoInfo] = useState(false);
	const [modal, setModal] = useState(false);
	const [modalContent, setModalContent] = useState(<></>);
	const token = useSelector((state) => state.member.member.tokenInfo.token);
	const myVideosInfo = useRef();
	const content = [];

	useEffect(() => {
		const getVideos = async () => {
			myVideosInfo.current = await getVideoInfo(token);
			if (myVideosInfo.current === null) {
				window.location.href = "/";
				alert("다시 로그인해주세요!");
			}
			setGotVideoInfo(true);
			/* console.log("비디오 정보 :", myVideosInfo.current); */
		}
		getVideos();
	}, [])

	if (gotVideoInfo) {
		myVideosInfo.current.forEach(elem => {
			let dateObj = new Date(elem.creation_date);
			let timeString_KR = dateObj.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
			const videoUrl = s3Domain + elem.server_name;
			const cont = (
				<article key={videoUrl + 'a'}>
					<Video autoPlay loop src={videoUrl} key={videoUrl}
						onClick={() => handleVideo(modal, setModal, setModalContent, elem, token, myVideosInfo)}></Video>
					<h3 key={videoUrl + 't'}>{timeString_KR}</h3>
				</article>)

			content.push(cont)
		});
	}


	return (
		<>
			<GridContainer>
				{
					gotVideoInfo ?
						content
						:
						<div></div>
				}
			</GridContainer>
			{modal ?
				<Modal
					modal={modal}
					setModal={setModal}
					width="750"
					height="600"
					backgroundColor="rgba(0, 0, 0, 0)"
					element={
						modalContent
					}
				/>
				:
				<></>
			}
		</>
	)
}

export default VideoLibrary;