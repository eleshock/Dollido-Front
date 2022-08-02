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
	top: -20%;
    left: 12%;
	animation: ${blinkEffect} 0.25s step-end infinite;
`;

const Judgement = ({ index }) => {
	const partnerVideos = useSelector((state) => state.videos);
	const isAbusing = useSelector((state) => state.item.judgementList[partnerVideos[index].id]);
	const [content, setContent] = useState(null);
	useEffect(() => {
			setContent(
				isAbusing ? (
					<JudgementImage src={judgementEffect}/>
				) : null
			);
	}, [isAbusing]);

	return content;
};

export default Judgement;
