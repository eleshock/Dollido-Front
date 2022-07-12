import axios from "axios";
import { useEffect, useState, Link } from "react";
import io from "socket.io-client"
const socket = io("http://13.209.66.46:5000/");

function Room() {
    let [roomName, setRoomName] = useState("");

    useEffect(() => {
        socket.on("welcome", (newbieID, room) => {
            console.log(newbieID, room);
        });
    }, [socket]);

    function joinRoom() {
        console.log("hi")
        socket.emit("join_room", roomName, socket.id);
    }
    
    function hi() { 
        console.log("hi")
        axios.get("http://13.209.66.46:5000/api/test");
    }

    return (
        <div>
            < input type = "text"
            onChange = {
                (event) => setRoomName({
                    enteredValue: event.target.value
                })
            }
            />
            <button onClick={joinRoom}>방만들기zzzzzzzzz</button>
            <button onClick={hi}>zz</button>
        </div>
    )
}

export default Room;