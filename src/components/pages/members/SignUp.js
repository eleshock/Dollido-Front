import React, { useState } from 'react';
import Content from '../../common/members/Content';
import InputWithLabel from "../../common/members/InputWithLabe";
import Button from "../../common/members/Button";
import axios from 'axios';
import { ServerName } from '../../../serverName';

const SingUp = () => {
    let [nick, setNick] = useState("");
    let [id, setId] = useState("");
    let [pw, setPw] = useState("");
    let [pwOk, setPwOk] = useState("");

    let args = {user_id: id, user_nick: nick, user_pw: pw};
    const submit = () => {
        axios.post(`${ServerName}/api/user/signup/`, args).then((res) => {
            console.log(res.data);
        });
    }

    return (
        <Content title = "회원가입">
            <>
                <InputWithLabel label="닉네임" placeholder="닉네임" onChange={(event) => setNick(event.target.value)}/>
                <InputWithLabel label="아이디" placeholder="아이디" onChange={(event) => setId(event.target.value)}/>
                <InputWithLabel label="비밀번호" placeholder="비밀번호" type="password" onChange={(event) => setPw(event.target.value)}/>
                <InputWithLabel label="비밀번호 확인" placeholder="비밀번호 확인" type="password"onChange={(event) => setPwOk(event.target.value)}/>
                <Button onClick={submit}>회원가입</Button>
            </>
        </Content>
    );
}

export default SingUp;