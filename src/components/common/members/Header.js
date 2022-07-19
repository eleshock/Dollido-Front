import React from 'react';
import styled from 'styled-components';
import dollidoLogo from "../../../images/dollidoLogo.png";

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
    width: 100%;
    height: 100%;
    `;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    margin-top: 50px;
    border-radius: 8px;
    height: 100%;
    width: 100%;
`;

// 로고
const LogoWrapper = styled.div`
    height: 5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    width: 200px;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 15px;
    border-radius: 8px;
`;

const Header = ({children}) => (
    <Positioner>
        <ShadowedBox>
            <LogoWrapper>
                <Logo to="/" src={dollidoLogo}></Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

export default Header;