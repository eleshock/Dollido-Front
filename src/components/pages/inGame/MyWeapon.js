import { useEffect, useState } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { s3Domain } from "../../../s3Domain";
import { setMyWeapon } from '../../../modules/item';
import effect from "../../../images/reverse.gif";



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
    const itemState = useSelector((state) => (state.item));
    const myWeaponImage = itemState.myWeaponImage;
    const isMeFlag = itemState.isMe;

    const membersState = useSelector((state) => (state.member));
    const myGIF = membersState.member.user_gif;

    useEffect(() => {
        // socket.on('my_weapon', (streamID, randomList) => {
            // dispatch(setRandom(randomList));
            console.log(myWeaponImage);

            setContent(
                <Container>
                        <BackgroundSizeStyle src={effect} ></BackgroundSizeStyle>
                </Container>
                )
            setTimeout(() => {
                if(isMeFlag) {
                    setContent(<Container>
                        <BackgroundSizeStyle src={`${s3Domain}${myGIF}`} ></BackgroundSizeStyle>
                        </Container>);
                } else {
                    setContent(<Container>
                        <BackgroundSizeStyle src={`${s3Domain}${myWeaponImage}`} ></BackgroundSizeStyle>
                        </Container>);
                }
            }, 2400);
            setTimeout(() => {
                dispatch(setMyWeapon(false));
            }, 6000)

    }, [])
    return content;
}


export default MyWeapon;