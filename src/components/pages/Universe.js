import univBackground from '../../images/DollidoUniverse.gif';
import { Background } from "../common/Background.tsx"
import { Link } from "react-router-dom";
import "../common/Button.css"

const Universe = () => {
    return (
        <Background background={univBackground}
        element={
            <Link to="/lobby">
                <a class="btn btn-sm animated-button thar-two" style={ { position: "absolute", bottom: "0%", left: "50%", transform: "translate(-50%, -50%)", width: "300px", height: "100px"} } > <p style={ {fontSize: "40px", fontWeight: "900", fontFamily: "Black Han Sans", margin: "15px"} }> SKIP </p> </a>
            </Link>
            }
        />

    );
};

export default Universe;