import styled from 'styled-components';

interface Props {
    background: string;
    element: JSX.Element;
};

const Content = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const MainBackgroundDiv = styled.div<{ background: string }>`
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(${(props) => props.background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

export const Background = ({ background, element }: Props) => {
    return (
        <Content>
            <MainBackgroundDiv background ={background}>
                {element}
            </MainBackgroundDiv>
        </Content>
    )
}
