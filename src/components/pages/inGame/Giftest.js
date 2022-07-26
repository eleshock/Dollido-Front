import axios from "axios"
import { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import {ServerName} from "../../../serverName";
import { s3Domain } from "../../../s3Domain";
import { useSelector } from "react-redux";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70vh;
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



const Giftest = () => {
    const [name, setName] = useState(['0.gif'])
    const tempGIF = useRef();

    const randomGIF = useSelector((state) => state.random);

    const [countDown, setCountDown] = useState(true);
    const [count, setCount] = useState(0);
    const [seconds, setSeconds] = useState(3);

    const Ticktock = () => {
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
                        setCountDown(true);
                    }, 4000);
                    return () => clearInterval(timer);
                }
            // eslint-disable-next-line react-hooks/exhaustive-deps

            }, [seconds]);
    }


    // get gifs file subjects from server
    const nameFunction = () => {
        axios.get(`${ServerName}/api/gifs/list`)
            .then((response) => {
                setName(response.data);
            });
    }
    tempGIF.current = nameFunction;

    useEffect(() => {
        tempGIF.current()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    Ticktock();

    return (
        <Container>
            {!countDown ?
            <BackgroundSizeStyle src={`${s3Domain}${name[randomGIF[0][count]]}`}></BackgroundSizeStyle>:
                <Timer> {seconds} </Timer>}
        </Container>
    );
};

export default Giftest;