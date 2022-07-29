import { Dispatch, SetStateAction } from "react";
import styled  from "styled-components";

interface Props {
    width: string;
    height: string;
    element: JSX.Element;
    modal: boolean;
    setModal: Dispatch <SetStateAction<boolean>> ;
    setChange: Dispatch <SetStateAction<boolean>> ;
    video: void;
};

const View = styled.div<{ width: string; height: string }>`
    @keyframes switchModalOn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    };

    position: fixed;
    display: flex;
    flex-direction: column;
    left: calc(50vw - ${(props) => props.width}px / 2);
    top: calc(50vh - ${(props) => props.height}px / 2);
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: white;
    animation-name: switchModalOn;
    animation-duration: 0.5s;
    z-index: 2000;
    border-radius: 8px;
    
    .exit-wrapper {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 32px;
        width: 32px;
        height: 32px;
        line-height: 22px;
        border: 1px solid black;
        border-radius: 100%;
        text-align: center;
        background-color: white;
        cursor: pointer;
    }
`;

const Canvas = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 53;
    animation-name: switchModalOn;
    animation-duration: 0.5s;
`;

export const Modal = ({ width, height, element, modal, setModal, setChange}: Props) => {
    
    const modalOff = () => {
        setModal(false);
        setChange(true);
    };

    return (
        <>
            <View width={width} height={height}>
                <div className="exit-wrapper" onClick={modalOff}>
                    &times;
                </div>
                {element}
            </View>
            <Canvas onClick={modalOff} />
        </>
    );
};