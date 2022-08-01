import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import judgementEffect from "../../../images/judgement.png";
import styled, { keyframes } from "styled-components";

const blinkEffect = keyframes`
    50% {
        opacity: 0;
    }
`;
const JudgementImage = styled.img`
	position: absolute;
	width: auto;
	height: auto;
	animation: ${blinkEffect} 0.25s step-end infinite;
`;

const Judgement = ({ socket, index }) => {
	const partnerVideos = useSelector((state) => state.videos);
	const judgement = useSelector((state) => state.item.judgement);
	const judgementID = useSelector((state) => state.item.judgementID);
	const [content, setContent] = useState(null);
	useEffect(() => {
		if (partnerVideos[index].id === judgementID) {
		if (index === 0) {
			setContent(
			judgement ? (
				<JudgementImage
				src={judgementEffect}
				style={{ top: "-20%", right: "12%" }}
				/>
			) : null
			);
		} else if (index === 1) {
			setContent(
			judgement ? (
				<JudgementImage
				src={judgementEffect}
				style={{ top: "60%", left: "12%" }}
				/>
			) : null
			);
		} else if (index === 2) {
			setContent(
			judgement ? (
				<JudgementImage
				src={judgementEffect}
				style={{ top: "60%", right: "12%" }}
				/>
			) : null
			);
		}
		}
	}, [judgement]);

	return content;
};

export default Judgement;
