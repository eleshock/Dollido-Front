import { useEffect, useState } from 'react';
import { useSelector,  useDispatch } from "react-redux";
import { setReverse, setReverseCheck } from "../../../modules/item"
import effect from "../../../images/laughEffection.webp";



function ReverseMode({socket}) {

  const itemState = useSelector((state) => (state.item));
  const dispatch = useDispatch();
  const [content, setContent] = useState(<></>)
  const ReverseCheck = itemState.reverseCheck;
  const Reverse = itemState.reverse;


useEffect(() => { 
    console.log(ReverseCheck)
    console.log(Reverse)
    socket.on("reverse", (socketID) => {
        if(socketID === socket.id){
        dispatch(setReverseCheck(true))
        
      }  
      dispatch(setReverse(true));
      setContent(<img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"7%", right:"35%"}}></img>)
      setTimeout(() => {
            dispatch(setReverse(false));
            setContent(<></>)
        }, 5000);
    })

  }, [socket])

  return content;
}

export default ReverseMode;
