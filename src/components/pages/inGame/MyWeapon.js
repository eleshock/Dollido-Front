import { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { s3Domain } from "../../../s3Domain";
import { setMyWeapon } from '../../../modules/item';
import effect from "../../../images/reverse.gif";
import { setRandom } from "../../../modules/random";



const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
color: white;
`

const BackgroundSizeStyle = styled.img`
width: 700px;
height: 600px;
object-fit: contain;
`;



const MyWeapon = ({socket}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(<></>)


    useEffect(() => {
        // socket.on('my_weapon', (streamID, randomList) => {
            // dispatch(setRandom(randomList));
            console.log("sfda")

            setContent(
                <Container>
                        <BackgroundSizeStyle src={effect} ></BackgroundSizeStyle>
                </Container>
                )
            setTimeout(() => {
                dispatch(setMyWeapon(false));
                setContent(<></>);
            }, 2400);
        // })
    }, [])
    console.log(content)
    return content;
}


export default MyWeapon;