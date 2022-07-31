import univBackground from '../../images/DollidoUniverse.gif';
import { Link } from "react-router-dom";
import Button from '../common/Button';
import { GlobalStyles } from '../common/Global.tsx';
import styled from 'styled-components';

const Word = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Black Han Sans";
`

const Universe = () => {
    return (
        <div>
            <GlobalStyles bgImage={univBackground}></GlobalStyles>
            <Link to="/lobby">
                <Button Button style = {
                    {
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        width: "15%",
                        height: "10%"
                    }
                } >
                    <Word style={{fontSize: "2rem"}}> SKIP </Word>
                </Button>
            </Link>
        </div>

    );
};

export default Universe;