

function ReverseStart() {
    console.log(ReverseClickCount)
    console.log(Reversed)
    if(ReverseClickCount == 0 && Reversed == false && gameStarted){
      socket.emit("reverse", {roomID: roomID, socketID: socket.id})
    }

  }

  async function ReverseMode(socketID) {
    
    if(socketID === socket.id)  
       ReverseClickCount += 1;
    const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))
      // dispatch(setReverse(true));
      Reversed = true;
      await wait(10000)
      // dispatch(setReverse(false));
      Reversed = false;
    return;
  }
  



const ShowingReverse = () =>  {  

    return <img src={reverseEffect} style={{position:"absolute", width:"auto", height:"auto", top:"7%", right:"35%"}}></img>

  }


  useEffect(() => {

    socket.on("reverse", (socketID) => {
        ReverseMode(socketID)
      })

  }, [socket])