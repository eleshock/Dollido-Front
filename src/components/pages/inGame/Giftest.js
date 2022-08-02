import axios from "axios"
import { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import {ServerName} from "../../../serverName";
import { s3Domain } from "../../../s3Domain";
import { useSelector } from "react-redux";
import reverseMode from "../../../images/reverseMode.gif";
import number_1 from "../../../images/numberSet/number_1.png"
import number_2 from "../../../images/numberSet/number_2.png"
import number_3 from "../../../images/numberSet/number_3.png"
import gifList from "../../../images/gifList";

const numberImageList = [number_1, number_2, number_3];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70vh;
    align-items: center;
    color: white;
`

const Timer = styled.img`
    width: 250px;
`

const BackgroundSizeStyle = styled.img`
    width: 900px;
    height: 500px;
    object-fit: contain;
    background-color: transparent;
`;

const ReverseModeStyle = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`

const Giftest = () => {
    const [name, setName] = useState(['0.gif'])
    const tempGIF = useRef();

    const randomGIF = useSelector((state) => state.random);
    const reverse = useSelector((state) => state.item.reverse);
    const [reverse1stGIF, setReverse1stGIF] = useState(true);

    const [countDown, setCountDown] = useState(true);
    const [count, setCount] = useState(0);
    const [seconds, setSeconds] = useState(3);

    const Ticktock = () => {
        useEffect(() => {
                if(seconds >= 1 && seconds <= 3) {
                    const timer = setInterval(() => {
                        if (seconds === 1){
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
                    }, 6000);
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
            // setName(gifList);
        }, []);

    Ticktock();

    if (reverse) {
        setTimeout(() => {
            setReverse1stGIF(false);
        }, 1500);
    }

    if (!reverse && !reverse1stGIF) {
        setReverse1stGIF(true);
    }

    return (
        <Container>
            { (reverse && reverse1stGIF) ?
                <ReverseModeStyle src={reverseMode}></ReverseModeStyle>
                :
                !countDown ?
                    <BackgroundSizeStyle src={`${s3Domain}${name[randomGIF[0][count]]}`}></BackgroundSizeStyle>
                    :
                    <Timer src={numberImageList[seconds-1]}></Timer>}
        </Container>
    );
};

export default Giftest;