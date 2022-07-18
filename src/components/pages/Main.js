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
import "../common/Button.css"

// images import
import mainBackground from '../../images/main_Back.gif';


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
                    <div>
                        <a class="btn btn-sm animated-button thar-two" style={ { position: "absolute", bottom: "20%", left: "50%", transform: "translate(-50%, -50%)", width: "300px", height: "100px"} } onClick={() => { setModal(true); }}> <p style={ {fontSize: "40px", fontWeight: "900", fontFamily: "Black Han Sans", margin: "15px"} }> Game Start </p> </a>
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