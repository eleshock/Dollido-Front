import React from "react";
import styled from "styled-components";

const Container = styled.h2`
    text-align: center;
    width: 100%;
    color: white;
    flex: 1;
    margin: 0;
`

const IsReady = ({index}) => {
    return (
        <Container>Ready</Container>
    );
}

export default IsReady;