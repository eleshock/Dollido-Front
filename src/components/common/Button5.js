import React from 'react';
import styled, { css } from "styled-components";
import "./Button5.css";




function button5({children, onClick}) {
  return (
    <div class="button5">
    <span class='start-btn' onClick={onClick}>{children}</span>
    </div>
  );
}

export default button5;
