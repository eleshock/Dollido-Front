import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';

import Button from "../common/Button.js";
import { Modal } from "../common/Modal.tsx";
import { Background } from "../common/Background.tsx"

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
                            <Link to="/roomList">
                                <Button color="yellow" size="large" style={ { position: "absolute", top: "70%" } }>
                                    다음 페이지
                                </Button>
                            </Link>
                            <Link to="/gif_front">
                                <Button color="yellow" size="large" style={ { position: "absolute", top: "30%" } }>
                                    빵빵또로로롱
                                </Button>
                            </Link>
                        </div>
                    </div>
                }
            />
            {modal && (
                <Modal
                    modal={modal}
                    setModal={setModal}
                    width="900"
                    height="600"
                    element={
                        <div>
                            TODO
                        </div>
                    }
                />
            )}
        </ThemeProvider>
    );
};

export default Main;