import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    padding: 0 15px 0 0;
    & + & {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    padding-left: 4px;
    font-size: 0.9rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 5px;
    line-height: 2.5rem;
    font-size: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputWithLabel = ({label, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest}/>
    </Wrapper>
);

export default InputWithLabel;