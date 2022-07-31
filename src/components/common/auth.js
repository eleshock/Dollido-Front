import axios from 'axios';
import { ServerName } from '../../serverName';


export default async (token) => {
    async function auth() {
        let result = await axios.post(`${ServerName}/api/user/signin/auth`, {}, {
            headers: {
                token: token
            }
        })
        return result.data.bool;
    }
    
    return auth();
}