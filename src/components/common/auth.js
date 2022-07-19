import axios from 'axios';
import { ServerName } from '../../serverName';

export default async (token) => {
    console.log(token.token);
    await axios.post(`${ServerName}/api/user/signin/auth`, {}, {
        headers: {
            token: token.token
        }
    }).then((res) => {
        let result = res.data;
        if (!result.bool) {
            window.location.href = "/";
            alert("로그인 해주세요");
        }
    })
}