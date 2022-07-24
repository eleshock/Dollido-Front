import axios from 'axios';
import { ServerName } from '../../serverName';
import { useSelector } from 'react-redux';

export default () => {
    const token = useSelector((state) => ({
        token: state.member.member.tokenInfo.token
    }));
    let bool;
    async function auth() {
    
        let result = await axios.post(`${ServerName}/api/user/signin/auth`, {}, {
            headers: {
                token: token
            }
        })

        bool = result.data.bool;
    }
    auth();
    return bool;
}