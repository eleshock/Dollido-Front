import axios from "axios";
import { useEffect } from "react";

const Test = () => {
    const callApi = async () => {
        axios.get("/api/home").then((res) => console.log(res.data.test));
    };

    useEffect(() => {
        callApi();
    }, []);

    return (
        <div>
            <h1>SalmonSushi</h1>
        </div>
    );
};

export default Test;