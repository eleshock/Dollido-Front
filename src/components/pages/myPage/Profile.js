import styled from "styled-components";
import moai from "../../../images/moai.png";

export default function profile() {
    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
            <TierImage>
            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={moai} />
            </TierImage>
            <Profile>
                <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ margin: "10px 10px 0 0" }}>
                    <ProfileTitle>[ 유 저 정 보 ]</ProfileTitle>
                    <ProfileName>나웃는거본사람</ProfileName>
                </div>
                <div>
                    <ProfileRanking>랭킹 1위</ProfileRanking>
                </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", margin: "50px 0 0 0" }}>
                <div style={{ marginRight: "30px" }}>
                    <ProfileTitle>[ 전 적 ]</ProfileTitle>
                    <ProfileContent>WIN 103 / LOSE 10</ProfileContent>
                </div>
                <div>
                    <ProfileTitle>[ 티 어 ]</ProfileTitle>
                    <ProfileContent>모아이</ProfileContent>
                </div>
                </div>
            </Profile>
        </div>
    );
}

const TierImage = styled.div`
width: 400px;
height: 400px;
border-radius: 50%;
overflow: hidden;
margin: 50px 0 0 0;
`

const Profile = styled.div`
display: flex;
flex-direction: column;
margin: 50px 0 0 50px;
font-family: koverwatch;
`

const ProfileTitle = styled.div`
color: white;
font-size: 3rem;
text-align: left;
`

const ProfileName = styled.div`
color: white;
font-size: 4.5rem;
text-align: left;
`
const ProfileRanking = styled.div`
color: white;
font-size: 2rem;
text-align: left;
`

const ProfileContent = styled.div`
color: white;
font-size: 2.5rem;
text-align: center;
`