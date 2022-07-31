import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./css/Chat.css"

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on("onConnect", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on("onDisconnect", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // console.log(messageList);

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
        <div className="chat-window">
          <div className="chat-header">
            <p style={{textAlign: "center"}}>Live  Chat</p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent, index) => {
                return (
                    <div
                      key={index}
                      className="message"
                      id={
                        messageContent.author !== "system" ?
                          messageContent.author === username ? 
                            "you" 
                          : "other"
                        : "system"
                      }
                    >
                      <div>
                        <p id="author">{messageContent.author}</p>
                        <div className="message-content">
                          <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                        </div>
                      </div>
                    </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="채팅을 입력하세요."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#10166;</button>
          </div>
        </div>
    </div>
  );
}

export default Chat;
