import React, { useState } from 'react';
import axios from "axios";

import Content from '../../common/members/Content';
import InputWithLabel from "../../common/members/InputWithLabe";
import Button from "../../common/members/Button";
import RightAlignedLink from "../../common/members/RightAlignedLink";
import FailMessage from '../../common/members/FailMessage';

import { ServerName } from '../../../serverName';
import { useDispatch } from "react-redux";
import { setMember, setUserGif } from "../../../modules/member"

import useSound from 'use-sound';
import {select, exit} from '../Sound';

const SingIn = ({ setChange }) => {
    let [id, setId] = useState("");
    let [pw, setPw] = useState("");
    let [fail, setFail] = useState("");

    const dispatch = useDispatch();

    const submit = async () => {
        let args = { user_id: id, user_pw: pw };
        await axios.post(`${ServerName}/api/user/signin/`, args).then((res) => {
            let result = res.data;
            if (result.bool) {
                dispatch(setMember(result.member));
                dispatch(setUserGif(result.user_gif));
                window.location.href = "/univ";
            } else {
                setFail(result.msg);
            }
        });
    }

    const onChange = () => {
        setChange(false);
    }

    const [selectSound] = useSound(
        select,
        { volume: 0.5 }
    );

    const [exitSound] = useSound(
        exit, {
            volume: 0.5
        }
    );

    return (
        <Content title="로그인">
            <InputWithLabel 
                label = "아이디"
                name = "id"
                placeholder = "아이디"
                onChange = {
                    (event) => setId(event.target.value)
                }
                onKeyPress = {
                    (e) => {
                        e.key === "Enter" && submit();
                    }
                }
            />
            <InputWithLabel 
                label="비밀번호" 
                name="pw" 
                placeholder="비밀번호" 
                type="password" 
                onChange={(event) => setPw(event.target.value)} 
                onKeyPress = {
                    (e) => {
                        e.key === "Enter" && submit();
                    }
                }
                />
            <FailMessage msg={fail}></FailMessage>
            <Button onClick={submit} onMouseEnter={selectSound}>로그인</Button>
            <RightAlignedLink onClick={onChange} onMouseEnter={selectSound}>회원가입</RightAlignedLink>
        </Content>
    );
}

export default SingIn;