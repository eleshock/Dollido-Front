import React, { useState } from "react";
import styled, { ThemeProvider } from 'styled-components';
import axios from "axios";
import { useEffect } from "react";

import Button from "../common/Button.js";
import { Background } from "../common/Background.tsx"

import mainBackground from '../../images/main_background.png';


function Player(props) {

    return <div style={{backgroundColor:'blue', width:450, float:props.float}}>
        <h3 style={{color:'pink'}}>{props.playerId}</h3>
    <video autoPlay width={400} height={300} style={{backgroundColor:'white'}}></video>
</div>
}

const Test = () => {
    

    return (
        <ThemeProvider
            theme={{
                palette: {
                    yellow: "#E5B941"
                }
            }}>
            <header style={{backgroundColor:'green', height:80}}>
                <h1 style={{color : "#E5B941"}}>This is In Game Page</h1>
            </header>
            <Background
                background={mainBackground}
                element = {
                    <div >  
                        <div>
                            <Player playerId={'SalmonSushi'} float={'left'}></Player>
                            <Player playerId={'DongDongBro'} float={'right'}></Player>
                        </div>          
                        
                        <div>
                            <Player playerId={'ElectricShock'} float={'left'}></Player>
                            <Player playerId={'KiLee'} float={'right'}></Player>
                        </div>
                        
                    </div>
                }>
            </Background>
        </ThemeProvider>
        
    );
};

export default Test;