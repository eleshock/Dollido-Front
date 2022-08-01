import React from 'react';
import styled, { css } from "styled-components";
import "./Button5.css";

const RedButton = styled.button`

  text-shadow: 1px 1px pink, -1px -1px maroon;
  font-family: 'PressStart2P';
  font-size: 30pt;
  line-height: 1.5em;
  text-align: center;
  display: inline-block;
  width: 1.5em;
  -webkit-border-radius: .75em;
  -moz-border-radius: .75em;
  -o-border-radius: .75em;
  border-radius: .75em;
  background-color: red;
  -webkit-box-shadow:  0 .2em maroon;
  -moz-box-shadow:  0 .2em maroon;
  -o-box-shadow:  0 .2em maroon;
  box-shadow:  0 .2em maroon;
  color: red;
  margin: 5px;
  background-image: -o-linear-gradient(left top, pink 3%, red 22%, maroon 99%);
  background-image: -moz-linear-gradient(left top, pink 3%, red 22%, maroon 99%);
  background-image: -webkit-linear-gradient(left top, pink 3%, red 22%, maroon 99%);
  background-image: linear-gradient(left top, pink 3%, red 22%, maroon 99%);
  cursor: pointer;
  padding-left: 5px;

  &:active {
      box-shadow: none;
      position: relative;
      top: .2em;
  
  }


`

const BlueButton = styled.button`

    text-shadow: 1px 1px pink, -1px -1px maroon;
    font-family: 'PressStart2P';
    font-size: 30pt;
    line-height: 1.5em;
    text-align: center;
    display: inline-block;
    width: 1.5em;
    -webkit-border-radius: .75em;
    -moz-border-radius: .75em;
    -o-border-radius: .75em;
    border-radius: .75em;
    background-color: blue;
    -webkit-box-shadow:  0 .2em blue;
    -moz-box-shadow:  0 .2em blue;
    -o-box-shadow:  0 .2em blue;
    box-shadow:  0 .2em blue;
    color: blue;
    margin: 5px;
    background-image: -o-linear-gradient(left top, pink 3%, blue 22%, blue 99%);
    background-image: -moz-linear-gradient(left top, pink 3%, blue 22%, blue 99%);
    background-image: -webkit-linear-gradient(left top, pink 3%, blue 22%, blue 99%);
    background-image: linear-gradient(left top, pink 3%, blue 22%, blue 99%);
    cursor: pointer;
    padding-left: 5px;

    &:active {
        box-shadow: none;
        position: relative;
        top: .2em;

}

`

const YellowButton = styled.button`

    text-shadow: 1px 1px pink, -1px -1px maroon;
    font-family: 'PressStart2P';
    font-size: 30pt;
    line-height: 1.5em;
    text-align: center;
    display: inline-block;
    width: 1.5em;
    -webkit-border-radius: .75em;
    -moz-border-radius: .75em;
    -o-border-radius: .75em;
    border-radius: .75em;
    background-color: yellow;
    -webkit-box-shadow:  0 .2em yellow;
    -moz-box-shadow:  0 .2em yellow;
    -o-box-shadow:  0 .2em yellow;
    box-shadow:  0 .2em yellow;
    color: yellow;
    margin: 5px;
    background-image: -o-linear-gradient(left top, pink 3%, yellow 22%, yellow 99%);
    background-image: -moz-linear-gradient(left top, pink 3%, yellow 22%, yellow 99%);
    background-image: -webkit-linear-gradient(left top, pink 3%, yellow 22%, yellow 99%);
    background-image: linear-gradient(left top, pink 3%, yellow 22%, yellow 99%);
    cursor: pointer;
    padding-left: 5px;

    &:active {
        box-shadow: none;
        position: relative;
        top: .2em;

}

`

function RedButtons({children, ...rest}) {
  return (

    <RedButton {...rest}> {children} </RedButton>
  );
}

function BlueButtons({children, ...rest}){

  return (

    <BlueButton {...rest}> {children} </BlueButton>
  );
}

function YellowButtons({children, ...rest}){

  return (

    <YellowButton {...rest}> {children} </YellowButton>
  );
}

export {RedButtons, BlueButtons, YellowButtons};
