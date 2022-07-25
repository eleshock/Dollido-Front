import React from "react";
import InGame from "./InGame";
import io from "socket.io-client";
import { ServerName } from "../../../serverName";

const SERVER_ADDRESS = ServerName;
const socket = io(SERVER_ADDRESS, {
  withCredentials: false,
  extraHeaders: {
    "dollido-header": "dollido",
  },
});

function Room({ match }) {
  return (
    <div style={{height:"100vh"}}>
      <InGame match={match} socket={socket} />
    </div>
  );
}

export default Room;
