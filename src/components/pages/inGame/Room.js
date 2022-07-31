import React, { useEffect } from "react";
import InGame from "./InGame";
import io from "socket.io-client";
import { ServerName } from "../../../serverName";


function Room({ match }) {
  const SERVER_ADDRESS = ServerName;
  let socket = io(SERVER_ADDRESS);

  useEffect(() => {
    return () => {
      socket.disconnect();
    }
  });

  return (
    <div style={{height:"100vh"}}>
      <InGame match={match} socket={socket} />
    </div>
  );
}

export default Room;