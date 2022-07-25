import { useEffect, useState } from 'react';
import { useSelector,  useDispatch } from "react-redux";
import { setReverse, setReverseCheck } from "../../../modules/inGame"
import effect from "../../../images/laughEffection.webp";



function ReverseMode({socket}) {

  const inGameState = useSelector((state) => (state.inGame));
  const dispatch = useDispatch();
  const [content, setContent] = useState(<></>)
  const myStream = inGameState.myStream;
  const ReverseCheck = inGameState.reverseCheck;
  const Reverse = inGameState.reverse;


useEffect(() => { 
    console.log(ReverseCheck)
    console.log(Reverse)
    console.log(myStream)
    socket.on("reverse", (socketID) => {
        if(socketID === socket.id){
        dispatch(setReverseCheck(true))
        
      }  
      dispatch(setReverse(true));
      setContent(<img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"7%", right:"35%"}}></img>)
      setTimeout(() => {
            dispatch(setReverse(false));
            setContent(<></>)
        }, 10000);
    })

  }, [socket])

  return content;
}

export default ReverseMode;
