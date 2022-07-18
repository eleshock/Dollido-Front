import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';

// common import
import Button from "../common/Button.js";
import { Modal } from "../common/Modal.tsx";
import { Background } from "../common/Background.tsx";
import SignIn from "./members/SignIn.js";
import SignUp from "./members/SignUp.js";
import Header from "../common/members/Header";

// images import
import mainBackground from '../../images/main_background.png';
import mainTitle from '../../images/main_title.png';
import mainLeft from '../../images/main_left.png';


const LeftSector = styled.div`
    position: absolute;
    top: 50% ;
    margin-top: -230px;
    left: 10%;
`;

const MainTitle = styled.img`
    width: 90%;
`;

const MainLeft = styled.img`
    opacity: 0.9;
    width: 70%;
    height: 99.4vh;
    margin-left: 5px;
`;

const Main = () => {
    const [modal, setModal] = useState(false);
    const [change, setChange] = useState(true);

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
                    <div style={ { display: "flex" } }>
                        <div style={ { flexGrow: "1", flexShrink: "1" } }>
                            <MainLeft src={mainLeft} />
                            <LeftSector>
                                <MainTitle src={mainTitle} />
                            </LeftSector>
                        </div>
                        <div style={ { position: "relative", flexGrow: "1", flexShrink: "1" } }>
                            <Button color="yellow" size="large" style={ { position: "absolute", top: "50%" } } onClick={() => { setModal(true); }}>
                                게임시작
                            </Button>
                            <Link to="/lobby">
                                <Button color="yellow" size="large" style={ { position: "absolute", top: "70%" } }>
                                    다음 페이지
                                </Button>
                            </Link>
                            <Link to="/play">
                                <Button color="yellow" size="large" style={ { position: "absolute", top: "30%" } }>
                                    In-Game Page
                                </Button>
                            </Link>
                            <Link to="/test">
                                <Button color="yellow" size="large" style={ { position: "absolute", top: "10%"} }>
                                    test
                                </Button>
                            </Link>
                        </div>
                    </div>
                }
            />
            {modal ?
                change ?
                    <Modal
                        modal={modal}
                        setModal={setModal}
                        setChange={setChange}
                        width="500"
                        height="520"
                        element={
                            <Header children={<SignIn setChange={setChange}/>} />
                        }
                    />
                    :
                    <Modal
                        modal={modal}
                        setModal={setModal}
                        setChange={setChange}
                        width="500"
                        height="670"
                        element={
                            <Header children={<SignUp/>} />
                        }
                    />
            :
            <></>
            }
        </ThemeProvider>
    );
};

export default Main;