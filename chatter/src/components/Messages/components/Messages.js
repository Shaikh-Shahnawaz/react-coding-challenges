import React, { useState, useContext, useEffect } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import "../styles/_messages.scss";

import initialBottyMessage from "../../../common/constants/initialBottyMessage";


const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});


function Messages() {

  useEffect(() => {
    socket.on("bot-message", (message) => {
    //  initialBottyMessage
    });

  }, []);

  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);

  // ===============my code===============
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  const onChangeMessage = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    setMessage([...message,input])
    socket.emit('user-message',message)
  };

 useEffect(()=>{

 },[])

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">

        <Message message={message} />
       
          {/* 
        <p
          style={{
            backgroundColor: "aqua",
            padding: "5px",
            textAlign: "right",
          }}
        >
          {" "}
          {message}{" "}
        </p> */}

        
      </div>
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;
