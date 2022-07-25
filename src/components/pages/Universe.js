import univBackground from '../../images/DollidoUniverse.gif';
import { Link } from "react-router-dom";
import Button from '../common/Button';
import { GlobalStyles } from '../common/Global.ts';

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
                        width: "300px",
                        height: "100px"
                    }
                } >
                    <p style={ {fontSize: "40px", fontWeight: "900", fontFamily: "Black Han Sans", margin: "0", lineHeight: "104px"} }>
                        SKIP
                    </p>
                </Button>
            </Link>
        </div>

    );
};

export default Universe;