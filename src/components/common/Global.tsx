import React from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import reverseBackground from "../../images/reverseBackground.jpg";

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

const ReverseStyle = createGlobalStyle`
        body {
            width: 100vw;
            height: 100vh;
            background: url(${reverseBackground});
            background-size: cover;
        }
    `

export const GlobalInGameBackGround: React.FC<Props> = (props) => {
    const reverse = useSelector((state) => state.item.reverse);
    const gameFinished = useSelector((state) => state.inGame.gameFinished);

    return <>
        {(reverse && !gameFinished) ?
            <ReverseStyle></ReverseStyle>
            :
            <GlobalStyles bgImage={props.bgImage}></GlobalStyles>
        }
    </>
}