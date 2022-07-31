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
    const isWho = itemState.isWho;

    const membersState = useSelector((state) => (state.member));
    const myGIF = membersState.user_gif;
    const myID = membersState.member.user_nick;

    useEffect(() => {
        // socket.on('my_weapon', (streamID, randomList) => {
            // dispatch(setRandom(randomList));
            // console.log(myWeaponImage);
            if(isMeFlag) {
                setContent(
                    <Container>
                        <h2> {myID} 발동!!</h2>
                            <BackgroundSizeStyle src={effect} ></BackgroundSizeStyle>
                    </Container>
                    )
                } else {
                    setContent(
                        <Container>
                            <h2> {isWho} 발동!!</h2>
                                <BackgroundSizeStyle src={effect} ></BackgroundSizeStyle>
                        </Container>
                        )
                }
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
            }, 7400)

    }, [])
    return content;
}


export default MyWeapon;