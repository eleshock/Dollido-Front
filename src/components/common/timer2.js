import React from 'react';
import styled, { css } from "styled-components";
import "./timer2.css"



function TimerCss2({children, ...rest}) {
    return (
  

        <div class="numero_counting_wrapper">
        <div class="numero_shape">{children}</div>
      </div>

      );
  }
  
  export default TimerCss2;