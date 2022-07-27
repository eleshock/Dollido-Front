import React from 'react';
import styled, { css } from "styled-components";
import "./Button3.css";

const Button3 = styled.button`

`;
// Usage

function button3({children, onClick}) {
  return (
  
        <div onClick={onClick} class="my-super-cool-btn">
          <div class="dots-container">
          </div>
          <span>{children}</span>
        </div>

  
  );
}

export default button3;
