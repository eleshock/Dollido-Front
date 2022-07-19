import axios from "axios";
import { ServerName } from "../../serverName";
import React, { useState, useRef, useEffect, useCallback } from "react";
const defaultPlayerId = "깨랑까랑";


function Test(props) {
   

    const ref = useRef();
     useEffect(() => {
        ref.current.srcObject = props.stream;
     }, [props.stream]);

    return (

        
        <video autoplay height = {300} ref={ref} style={{ backgroundColor: 'white', width: "100%" }} autoPlay />

    );


};

function Test2(props) {

    
    return <video autoPlay width="400px" ref={props.userVideo} />

}


export { Test as default, Test2};