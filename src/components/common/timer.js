import React from 'react';
import styled, { css } from "styled-components";
import "./timer.css"



function TimerCss({children, ...rest}) {
    return (
  

     <div id="clock">
        <p class="time">{ children }</p>
    </div>

      );
  }
  
  export default TimerCss;