import React from "react";
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
    display: flex;
    width: 75%;
    color: white;
    flex: 1.5;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Content = styled.div`
    width: 80%;
`

const HP = ({index}) => {
    return (
        <Container>
            <Content>
                <ProgressBar striped variant="danger" now={100}/>
            </Content>
        </Container>
    );
}

export default HP;