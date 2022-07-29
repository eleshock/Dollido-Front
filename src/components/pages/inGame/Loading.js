import styled from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";

const LoadingDiv = styled.div `
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Loading = () => {
    return (
        <SyncLoader
            color="#e02869"
            height={15}
            width={10}
            radius={2}
            margin={2}
        />
    );
}

const Load = () => {
    return (
        <LoadingDiv>
            <Loading></Loading>
        </LoadingDiv>
    );
}

export default Load;