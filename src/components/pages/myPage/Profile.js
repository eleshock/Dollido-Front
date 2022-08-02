import styled from "styled-components";
import Moai from "../../../images/Moai2.png";
import Kaonish from "../../../images/Kaonish.png";
import Monarisa from "../../../images/Monarisa.png";
import KoreanMask from "../../../images/KoreanMask.png";


export default function profile() {

    return (
        <div style = {{display: "flex", justifyContent: "center"}}>
            <Profile>
                <TierImage>
                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={Moai} />
                </TierImage>
                <div style = {{display: "flex", flexDirection: "column"}}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <ProfileAlign>
                            <ProfileTitle>닉네임</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>나웃는거본사람</ProfileContent>
                        </ProfileAlign>
                        <ProfileAlign>
                            <ProfileTitle>랭킹</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>1 위</ProfileContent>
                        </ProfileAlign>
                        <ProfileAlign>
                            <ProfileTitle>전적</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>103</ProfileContent>
                            <ProfileContent style = {{fontSize:"1.4rem", padding: "3px 0 0 0"}}>승</ProfileContent>
                            <ProfileContent>/</ProfileContent>
                            <ProfileContent>10</ProfileContent>
                            <ProfileContent style = {{fontSize:"1.4rem", padding: "3px 0 0 0"}}>패</ProfileContent>
                        </ProfileAlign>
                        <ProfileAlign>
                            <ProfileTitle>승률</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>90 %</ProfileContent>
                        </ProfileAlign>
                        <ProfileAlign>
                            <ProfileTitle>티어</ProfileTitle>
                            <ProfileBorder></ProfileBorder>
                            <ProfileContent>모아이</ProfileContent>
                        </ProfileAlign>
                    </div>
                </div>
            </Profile>
        </div>
    );
}

const Profile = styled.div`
    display: flex;
    flex-direction: row;
    width: 590px;
    height: 330px;
    margin: 50px 0 0 0;
    font-family: koverwatch;
    border: 2px solid rgba( 255, 255, 255, 0.3 );
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: rgba( 255, 255, 255, 0.3 );
    box-shadow: 5px 5px rgba( 255, 255, 255, 0.2 );
    &:hover {
        background-color: #00ffff79; // 다이아
        ${'' /* background-color: #ffe14079; // 골드 
        background-color: #C0C0C0A9; // 실버 */}
        ${'' /* background-color: #C3672999; // 브론즈 */}
        transition: background-color 1.5s;
    }
`

const TierImage = styled.div`
    width: 250px;
    height: 250px;
    overflow: hidden;
    border: 2px solid rgba( 255, 255, 255, 0.7 );
    border-radius: 7px;
    background-color: #ffffff;
    margin: 30px 30px 30px 0;
`


const ProfileTitle = styled.div`
    color: white;
    font-size: 1.8rem;
    text-align: left;
    ${'' /* background-color: #14073c79; */}
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