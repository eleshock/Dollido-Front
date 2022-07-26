import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import reverseBackground from "../../images/reverseBackground.gif";
import reverseMode from "../../images/reverseMode.gif";

interface Props {
    bgImage: string;
}

export const GlobalStyles = createGlobalStyle<Props>`
    body {
        width: 100vw;
        height: 100vh;
        background: url(${(props) => props.bgImage});
        background-size: cover;
    }
`


export const GlobalTest: React.FC<Props> = (props) => {
    const reverse = useSelector((state) => state.item.reverse);
    const gameFinished = useSelector((state) => state.inGame.gameFinished);
    const [change, setChange] = useState(false);

    const ReverseStyle = createGlobalStyle`
        body {
            width: 100vw;
            height: 100vh;
            background: url(${!change ? reverseMode : reverseBackground});
            background-size: cover;
        }
    `
    if (reverse) {
        setTimeout(() => {
            setChange(true);
        }, 1500)
    }

    if (!reverse && change) {
        setChange(false);
    }

    return <>
        {(reverse && !gameFinished) ?
            <ReverseStyle></ReverseStyle>
            :
            <GlobalStyles bgImage={props.bgImage}></GlobalStyles>
        }
    </>
}