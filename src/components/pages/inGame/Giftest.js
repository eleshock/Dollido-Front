import axios from "axios"
import { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import {ServerName} from "../../../serverName";
import { s3Domain } from "../../../s3Domain";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`

const Timer = styled.p`
    font-size: 100px;
    font-weight: "900"; 
    font-family: "Black Han Sans";
`

const BackgroundSizeStyle = styled.img`
    width: 900px;
    height: 500px;
    object-fit: contain;
    background-color: gray;
`;

const Giftest = (props) => {
    const [name, setName] = useState(['0.gif'])
    const [count, setCount] = useState(0);

    const [gifList, setGifList] = useState([null]);
    const tempGIF = useRef();
    const [countDown, setCountDown] = useState(true);
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';



    // get gifs file subjects from server
    const nameFunction = () => {
        axios.get(`${ServerName}/api/gifs/list`)
            .then((response) => {
                setName(response.data);
                console.log(response.data);
            });
    }
    tempGIF.current = nameFunction;

    useEffect(() => {
        tempGIF.current()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios.get(`${ServerName}/api/gifs/roomGIF`)
                .then((response) => {
                    setGifList(response.data.sendGIF);
                    console.log(gifList);
                });
            }, []);

    const [seconds, setSeconds] = useState(3);
    useEffect(() => {
        if(seconds >= 0 && seconds <= 3) {
            const timer = setInterval(() => {
                if (seconds === 0){
                    setSeconds(4);
                    setCountDown(false);
                }else {
                    setSeconds(value=> value-1);
                }
            }, 500);
            return () => clearInterval(timer);

        } else{
            const timer = setInterval(() => {
                setSeconds(3)
                setCount(value => value+1);
                console.log(count);
                setCountDown(true);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [count, seconds]);

    return (
        <Container>
            {!countDown ? 
                <BackgroundSizeStyle src={`${s3Domain}${name[gifList[count]]}`}></BackgroundSizeStyle> 
                : 
                <Timer> {seconds} </Timer>}
        </Container>
    );
};

export default Giftest;