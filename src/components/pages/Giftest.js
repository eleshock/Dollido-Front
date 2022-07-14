import axios from "axios"
import { useEffect, useState, useRef } from 'react';
import styled from "styled-components";

const BackgroundSizeStyle = styled.img`
    width: 700px;
    height: 550px;
    object-fit: contain;
    border: 3px solid gold;
    background-color: gray;
`;

const Giftest = () => {
    const [name, setName] = useState(['0.gif'])
    const [count, setCount] = useState(0);

    const [gifList, setGifList] = useState([null]);
    const tempGIF = useRef();

    // get gifs file subjects from server
    const nameFunction = () => {
        axios.get("/api/gifs")
            .then((response) => {
                setName(response.data.file);
            });
    }

    tempGIF.current = nameFunction;

    useEffect(() => {
        tempGIF.current()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios.get("/api/roomGIF")
                .then((response) => {
                    setGifList(response.data.sendGIF);
                });
            }, []);




    useEffect(() => {

        if(count % 2 === 0) {
            const timer = setInterval(() => {
                setCount(value => value+1);
                console.log(count);
            }, 1100);
            return () => clearInterval(timer);

        } else{
            const timer = setInterval(() => {
                setCount(value => value+1);
            }, 8000);
            return () => clearInterval(timer);
        }
    }, [count]);


    return (
        <BackgroundSizeStyle src={`http://dongbrew.click/${name[gifList[count]]}`}>
        </BackgroundSizeStyle>
    );
};

export default Giftest;