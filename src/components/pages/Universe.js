import univBackground from '../../images/DollidoUniverse.gif';
import { Background } from "../common/Background.tsx"
import { Link } from "react-router-dom";
import Button from '../common/Button';

const Universe = () => {
    return (
        <Background background={univBackground}
        element={
            <Link to="/lobby">
                <Button style={ { position: "absolute", bottom: "0%", left: "50%", transform: "translate(-50%, -50%)", width: "300px", height: "100px"} } > 
                    <p style={ {fontSize: "40px", fontWeight: "900", fontFamily: "Black Han Sans", margin: "0", lineHeight: "104px"} }>
                        SKIP
                    </p>
                </Button>
            </Link>
            }
        />

    );
};

export default Universe;