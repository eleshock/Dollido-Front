import styled from "styled-components";
import Moai from "../../../images/Moai2.png";
import Kaonish from "../../../images/Kaonish.png";
import Monarisa from "../../../images/Monarisa.png";
import KoreanMask from "../../../images/KoreanMask.png";

import { useSelector } from "react-redux";


export default function Profile() {
    const tier = useSelector((state) => state.member.tier);
    const ranking = useSelector((state) => state.member.ranking);
    const winRate = useSelector((state) => state.member.win_rate);
    const win = useSelector((state) => state.member.win);
    const lose = useSelector((state) => state.member.lose);
    const nickname = useSelector((state) => state.member.member.user_nick);

    let image;
    let profileFrame;
    let tierBackground;
    if (tier === "모나리자") {
        image = Monarisa;
        profileFrame = "2px solid #C0C0C0E9";
        tierBackground = "#C0C0C0";
    } else if (tier === "모아이") {
        image = Moai;
        profileFrame = "2px solid #00FFFF79";
        tierBackground = "#00FFFF";
    }
    else if (tier === "가오나시") {
        image = Kaonish;
        profileFrame = "2px solid #FFE140CC";
        tierBackground = "#FFE140";
    }
    else {
        image = KoreanMask;
        profileFrame = "2px solid #C36729F9";
        tierBackground = "#C36729";
    }


    return (
        <div style = {{display: "flex", justifyContent: "center"}}>
            <Container style={{border: profileFrame}}>
                <TierImage style = {{backgroundColor: tierBackground}}>
                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={image} />
                </TierImage>
                <div style = {{display: "flex", flexDirection: "column"}}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <ProfileAlign>
                            <ProfileTitle>닉네임</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>{nickname}</ProfileContent>
                        </ProfileAlign>
                        <ProfileAlign>
                            <ProfileTitle>랭킹</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>{ranking}</ProfileContent>
                        </ProfileAlign>
                        <ProfileAlign>
                            <ProfileTitle>전적</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>{win}</ProfileContent>
                            <ProfileContent style = {{fontSize:"1.4rem", padding: "3px 0 0 0"}}>승</ProfileContent>
                            <ProfileContent>/</ProfileContent>
                            <ProfileContent>{lose}</ProfileContent>
                            <ProfileContent style = {{fontSize:"1.4rem", padding: "3px 0 0 0"}}>패</ProfileContent>
                        </ProfileAlign>
                        <ProfileAlign>
                            <ProfileTitle>승률</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>{winRate} %</ProfileContent>
                        </ProfileAlign>
                        <ProfileAlign>
                            <ProfileTitle>티어</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>{tier}</ProfileContent>
                        </ProfileAlign>
                    </div>
                </div>
            </Container>
        </div>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 590px;
    height: 330px;
    margin: 50px 0 0 0;
    font-family: koverwatch;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: rgba( 255, 255, 255, 0.3 );

    box-shadow: 5px 5px rgba( 255, 255, 255, 0.2 );
    &:hover {
        transition: background-color 1.5s;
    }
`

const TierImage = styled.div`
    width: 250px;
    height: 250px;
    overflow: hidden;
    border: 2px solid rgba( 255, 255, 255, 0.4 );
    border-radius: 7px;
    margin: 30px 30px 30px 0;
`


const ProfileTitle = styled.div`
    color: white;
    font-size: 1.8rem;
    text-align: left;
    border-radius: 3px;
    padding: 2px 0 0 8px;
    margin: 3px;
    width: 70px;
    height: 43px;
    text-align: left;
`

const ProfileContent = styled.div`
    color: white;
    font-size: 1.8rem;
    text-align: left;
    border-radius: 3px;
    padding: 0 3px 0 3px;
    margin: 3px;
    height: 43px;
`
const ProfileAlign = styled.div`
    display: flex;
    justify-content: row;
`

const ProfileBorder = styled.div`
    margin: 14px 10px 0 5px;
    border-left: 2px solid white;
    height: 1.3rem;
`
