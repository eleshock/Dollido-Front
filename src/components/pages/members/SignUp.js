import React, { useState, useEffect, useRef } from 'react';
import Content from '../../common/members/Content';
import InputWithLabel from "../../common/members/InputWithLabe";
import FailMessage from '../../common/members/FailMessage';
import Button from "../../common/members/Button";

import axios from 'axios';
import { ServerName } from '../../../serverName';

const SingUp = ({ setChange }) => {
    let [nick, setNick] = useState("");
    let [id, setId] = useState("");
    let [pw, setPw] = useState("");
    let [pwOk, setPwOk] = useState("");
    let [fail, setFail] = useState("");

    useEffect(() => {
        pwCheck();
    }, [pw, pwOk]);

    async function pwCheck() {
        console.log(pw, pwOk)
        if(pwOk !== "" && pw !== pwOk) {
            setFail("비밀번호가 일치하지 않습니다");
        } else if (pw === pwOk) {
            setFail("");
        } else if (pwOk === "") {
            setFail("");
        }
    }

    const submit = async () => {
        let args = {user_id: id, user_nick: nick, user_pw: pw};
        await axios.post(`${ServerName}/api/user/signup/`, args).then((res) => {
            let result = res.data;
            console.log(result);
            if(result.bool) {
                setChange(true);
            } else {
                setFail(result.msg);
            }
        });
    }

    return (
        <Content title = "회원가입">
            <>
                <InputWithLabel label="닉네임" placeholder="닉네임" onChange={(event) => setNick(event.target.value)}/>
                <InputWithLabel label="아이디" placeholder="아이디" onChange={(event) => setId(event.target.value)}/>
                <InputWithLabel label="비밀번호" placeholder="비밀번호" type="password" onChange={(event) => setPw(event.target.value)}/>
                <InputWithLabel label="비밀번호 확인" placeholder="비밀번호 확인" type="password"onChange={(event) => setPwOk(event.target.value)}/>
                <FailMessage msg={fail}></FailMessage>
                <Button onClick={submit}>회원가입</Button>
            </>
        </Content>
    );
}

export default SingUp;