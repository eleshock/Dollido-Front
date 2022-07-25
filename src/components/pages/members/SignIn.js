import React, { useState } from 'react';
import axios from "axios";

import Content from '../../common/members/Content';
import InputWithLabel from "../../common/members/InputWithLabe";
import Button from "../../common/members/Button";
import RightAlignedLink from "../../common/members/RightAlignedLink";
import FailMessage from '../../common/members/FailMessage';

import { ServerName } from '../../../serverName';
import { useDispatch } from "react-redux";
import { setMember } from "../../../modules/member"


const SingIn = ({ setChange }) => {
    let [id, setId] = useState("");
    let [pw, setPw] = useState("");
    let [fail, setFail] = useState("");

    const dispatch = useDispatch();
    
    const submit = async () => {
        let args = {user_id: id,  user_pw: pw};
        await axios.post(`${ServerName}/api/user/signin/`, args).then((res) => {
            let result = res.data;
            if (result.bool){
                dispatch(setMember(result.member));
                window.location.href = "/univ";
            } else {
                setFail(result.msg);
            }
        });
    }

    const onChange = () => {
        setChange(false);
    }

    return (
        <Content title = "로그인">
            <InputWithLabel label="아이디" name="id" placeholder="아이디" onChange={(event) => setId(event.target.value)}/>
            <InputWithLabel label="비밀번호" name="pw" placeholder="비밀번호" type="password" onChange={(event) => setPw(event.target.value)}/>
            <FailMessage msg={fail}></FailMessage>
            <Button onClick={submit}>로그인</Button>
            <RightAlignedLink onClick={onChange}>회원가입</RightAlignedLink>
        </Content>
    );
}

export default SingIn;