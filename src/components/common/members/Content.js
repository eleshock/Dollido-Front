import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Content = styled.div`
    padding: 25px;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

const SignInContent = ({title, children}) => {
    return (
        <Content>
            <Title>{title}</Title>
            {children}
        </Content>
    );
}

export default SignInContent;