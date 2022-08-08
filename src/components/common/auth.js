import axios from 'axios';
import { ServerName } from '../../serverName';


export default async (token) => {
    let bool = false;
    async function auth() {
        let bool;
        await axios.post(`${ServerName}/api/user/signin/auth`, {}, {
            headers: {
                token: token
            }
        }).then((result) => {
            bool = result.data.bool
        }).catch(e => {
            bool = e.response.data.bool;
        })
        console.log(bool);
        return bool;
    }
    
    return auth();
}