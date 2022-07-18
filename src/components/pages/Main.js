import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';


// common import
import Button from "../common/Button.js";
import { Modal } from "../common/Modal.tsx";
import { Background } from "../common/Background.tsx"
import "../common/Button.css"

// images import
import mainBackground from '../../images/main_Back.gif';


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
                    <div>
                        {/* <Button color="yellow" size="large" style={ { position: "absolute", bottom: "20%", left: "50%", transform: "translate(-50%, -50%)" } } onClick={() => { setModal(true); }}>
                                게임시작
                        </Button> */}
                        {/* <div class="container" style={ { position: "absolute", bottom: "10%", left: "50%", transform: "translate(-50%, -50%)" } } onClick={() => { setModal(true); }}>
                            <button class="btn-1">게임 시작</button>
                        </div> */}

                        <a class="btn btn-sm animated-button thar-two" style={ { position: "absolute", bottom: "20%", left: "50%", transform: "translate(-50%, -50%)", width: "300px", height: "100px"} } onClick={() => { setModal(true); }}> <p style={ {fontSize: "40px", fontWeight: "900", fontFamily: "Black Han Sans", margin: "15px"} }> Game Start </p> </a>

                        {/* <Link to="/lobby">
                            <Button color="yellow" size="large" style={ { position: "absolute", bottom: "30%", left: "50%", transform: "translate(-50%, -50%)" } }>
                                다음 페이지
                            </Button>
                        </Link>
                        <Link to="/play">
                            <Button color="yellow" size="large" style={ { position: "absolute", bottom: "10%", left: "50%", transform: "translate(-50%, -50%)" } }>
                                In-Game Page
                            </Button>
                        </Link> */}
                        {/* <Link to="/test">
                            <Button color="yellow" size="large" style={ { position: "absolute", bottom: "0%", left: "50%", transform: "translate(-50%, -50%)" } }>
                                test
                            </Button>
                        </Link> */}
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
                            <h2 style={{margin: "30px"}}>띄울거 띄우삼요</h2>
                        </div>
                    }
                />
            )}
        </ThemeProvider>
    );
};

export default Main;