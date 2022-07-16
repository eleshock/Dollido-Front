import axios from "axios";
import { ServerName } from "../../serverName";

function Test() {
    const hi = () => {
        axios.get(`${ServerName}/api/test/test`).then((res) => {
            console.log("test: ", res.data.test);
            console.log("name: ", res.data.name);
            console.log("status: ", res.data.status);
        });
    };

    return (
        <div>
            <button onClick={hi}>TEST</button>
        </div>
    );
}

export default Test;