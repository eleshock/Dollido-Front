import { createGlobalStyle } from "styled-components";

interface Props {
    bgImage: string
}

export const GlobalStyles = createGlobalStyle<Props>`
    body {
        width: 100vw;
        height: 100vh;
        background: url(${(props) => props.bgImage});
        background-size: cover;
    }
`