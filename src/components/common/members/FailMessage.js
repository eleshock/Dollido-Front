import React from 'react';
import styled from 'styled-components';

const Msg = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
    margin: 10px 0 10px 0;
`

const FailMessage = ({msg}) => (
        <Msg>{msg}</Msg>
);

export default FailMessage;