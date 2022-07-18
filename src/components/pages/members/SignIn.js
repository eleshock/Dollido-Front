import React, { useState } from 'react';
import Content from '../../common/members/Content';
import InputWithLabel from "../../common/members/InputWithLabe";
import Button from "../../common/members/Button";
import RightAlignedLink from "../../common/members/RightAlignedLink";
import axios from "axios";
import { ServerName } from '../../../serverName';
import { useSelector, useDispatch } from "react-redux";
import { setMember } from "../../../modules/member"

const SingIn = ({ setChange }) => {
    let [id, setId] = useState("");
    let [pw, setPw] = useState("");
    const dispatch = useDispatch();
    const member = useSelector(state => ({
        member: state.member.member
    }));

    console.log(member)
    
    const submit = () => {
        let args = {user_id: id,  user_pw: pw};
        axios.post(`${ServerName}/api/user/signin/`, args).then((res) => {
            let result = res.data;
            console.log(result.member);
            if (result.bool){
                dispatch(setMember(result.member));
            }
        });
    }

    const onChange = () => {
        setChange(false);
    }

    return (
        <Content title = "로그인">
            <>
                <InputWithLabel label="아이디" name="id" placeholder="아이디" onChange={(event) => setId(event.target.value)}/>
                <InputWithLabel label="비밀번호" name="pw" placeholder="비밀번호" type="password" onChange={(event) => setPw(event.target.value)}/>
                <Button onClick={submit}>로그인</Button>
                <RightAlignedLink onClick={onChange}>회원가입</RightAlignedLink>
            </>
        </Content>
    );
}

export default SingIn;