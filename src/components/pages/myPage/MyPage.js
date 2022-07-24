import React, { useEffect, useState, useRef, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import Button2 from "../../common/Button2.js";
import { Modal } from "../../common/Modal.tsx";
import mainBackground from "../../../images/mainBackground.gif";
import { Background } from "../../common/Background.tsx";
import styled from "styled-components";
import moai from "../../../images/moai.png";

/* MUI */
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Ranking from './Ranking';
import Weapon from './Weapon.tsx';

const MyPage = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [modal, setModal] = useState(false);

  return (
      <ThemeProvider
          theme={{
              palette: {
                  yellow: "#E5B941"
              }
          }}
      >
          <Background
              background={mainBackground}
              element={
                <FlexContainer>
                  <header style={{ height: 80, display: "flex", justifyContent: "flex-end",alignItems: "center", padding: "0 100px 0 0"}}>
                    {localStorage.nickname ? (
                        <div>
                          <h3 style={{ color: "white" }}>
                            {localStorage.nickname}님, Dollido에 오신걸 환영합니다!
                          </h3>
                        </div>

                    ) : (
                      <div>
                        <h3 style={{ color: "white" }}>
                          닉네임이 없습니다
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
                            TabIndicatorProps={{style: {backgroundColor:"#57C2F0"}}}
                            sx = {{
                              "& button.Mui-selected": {color:"#57C2F0"},
                            }}
                            onChange={handleChange}>
                            <MyTab label="내 정보" value="1" />
                            <MyTab label="나만의 무기" value="2" />
                            <MyTab label="랭킹" value="3" />
                            <MyTab label="명예의 전당" value="4" />
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <div style = {{display:"flex", justifyContent:"center", flexDirection:"row", alignItems:"center"}}>
                            <TierImage>
                              <img style = {{width: "100%", height: "100%", objectFit: "cover"}} src= {moai} />
                            </TierImage>
                            <Profile>
                              <div>닉네임: 모아이는웃지않아</div>
                              <div>승/패/승률</div>
                              <div>티어</div>
                              <div>랭킹</div>
                            </Profile>
                          </div>
                        </TabPanel>
                        <TabPanel value="2">
                          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <Weapon></Weapon>
                          </div>
                        </TabPanel>
                        <TabPanel value="3">
                          <Ranking></Ranking>
                        </TabPanel>
                        <TabPanel value="4">
                          <h1 style = {{display: 'flex',
                          fontFamily: 'koverwatch',
                          textAlign:'center', justifyContent:'center', fontSize: '150px', margin: '150px 0 0 0',
                          background: "linear-gradient(to right top, #FFFFFF, #57C2F0)",
                          color: "transparent",
                          WebkitBackgroundClip: "text"
                          }}>Coming Soon</h1>
                        </TabPanel>
                      </MyTabContext>
                    </MyBox>
                  </Content>
                </FlexContainer>




              }

          />
          {modal &&
                  <Modal
                      modal={modal}
                      setModal={setModal}
                      width="500"
                      height="520"
                      element={
                          <div>모달인가요?</div>
                      }
                  />

          }
      </ThemeProvider>
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
  font-size: 35px;
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
  -webkit-background-clip: text
`


export default MyPage