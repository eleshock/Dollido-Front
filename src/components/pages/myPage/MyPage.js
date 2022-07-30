import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Modal } from "../../common/Modal.tsx";
import mainBackground from "../../../images/mainBackground.gif";
import styled from "styled-components";
import moai from "../../../images/moai.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalStyles } from "../../common/Global.tsx";

/* MUI */
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Ranking from './Ranking';
import Images from './Images';
import VideoLibrary from "./VideoLibrary";


const MyPage = () => {

  const nickname = useSelector((state) => state.member.member.user_nick);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [modal, setModal] = useState(false);

  return (
    <div style={{ height: "100vh" }}>
      <GlobalStyles bgImage={mainBackground}></GlobalStyles>
      <FlexContainer>
        <header style={{ height: 80, display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "0 100px 0 0" }}>
          {nickname && (
            <div>
              <h3 style={{ color: "white" }}>
                {nickname}님, Dollido에 오신걸 환영합니다!
              </h3>
            </div>
          )}
        </header>
        <Title>
          <GradationTitle>마이페이지</GradationTitle>
        </Title>
        <Content>
          <MyBox sx={{ width: '63%', typography: 'body1', color: 'white' }}>
            <MyTabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  centered
                  TabIndicatorProps={{ style: { backgroundColor: "#57C2F0" } }}
                  sx={{
                    "& button.Mui-selected": { color: "#57C2F0" },
                  }}
                  onChange={handleChange}>
                  <MyTab sx={{ "&:hover": { transform: "scale(1.3)" } }} label="내 정보" value="1" />
                  <MyTab sx={{ "&:hover": { transform: "scale(1.3)" } }} label="나만의 무기" value="2" />
                  <MyTab sx={{ "&:hover": { transform: "scale(1.3)" } }} label="랭킹" value="3" />
                  <MyTab sx={{ "&:hover": { transform: "scale(1.3)" } }} label="라이브러리" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
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
              </TabPanel>
              <TabPanel value="2">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Images></Images>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <Ranking></Ranking>
              </TabPanel>
              <TabPanel value="4">
                <VideoLibrary></VideoLibrary>
              </TabPanel>
            </MyTabContext>
          </MyBox>
        </Content>
        <BackToLobby to={'/lobby'}>
          &lt; 뒤로가기
        </BackToLobby>
      </FlexContainer>
    </div>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: koverwatch;
`

const Title = styled.div`
  display: flex;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
`

const MyTab = styled(Tab)`
  color: white;
  font-family: koverwatch;
  font-size: 40px;
  margin: 20px;
`
const MyBox = styled(Box)`

`
const MyTabContext = styled(TabContext)`
  display: flex;
  justify-content: center;
`

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

const GradationTitle = styled.h1`
  padding: 0 15px 0 100px;
  color: white;
  font-size: 6rem;
  font-style: italic;
  user-select: none;
  background: linear-gradient(to right top, #FFFFFF, #FFFFFF);
  ${'' /* -webkit-text-stroke: 3px black; */}
  color: transparent;
  -webkit-background-clip: text;
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

const BackToLobby = styled(Link)`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: auto;
  height: auto;
  color: white;
  font-size: 2rem;
  padding: 3px;
  margin: 0 100px 0 0;
  text-decoration: none;
  &:hover {
    transform: scale(1.2);
    color: white;
  }
`


export default MyPage