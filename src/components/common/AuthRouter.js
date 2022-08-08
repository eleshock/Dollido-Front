import auth from "./auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from 'react-redux';

export default (Commponent) => {
    const token = useSelector((state) => state.member.member.tokenInfo.token);
    
    const Test = () => {
        const navigate = useNavigate();
        useEffect(() => {
            auth(token).then((result) => {
                // console.log(result)
                if(!result) {
                    navigate("/")
                }
            });
        })
        
        return <Commponent/>
    }

    return Test;
}
