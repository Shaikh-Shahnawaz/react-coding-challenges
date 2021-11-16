import React, { useState, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import "../styles/_messages.scss";
import ReactScrollToBottom from 'react-scroll-to-bottom'
import initialBottyMessage from "../../../common/constants/initialBottyMessage";


const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});


function Messages() {

  useEffect(() => {
    socket.on("bot-message", (initialBottyMessage) => {
    
    });

  }, []);

  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);


// =============== [ My code ] ===============

  const emptyInput = useRef(null)
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  const onChangeMessage = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    setMessage([...message,input])
    socket.emit('user-message',message)

    // Ref for clearing the input
    emptyInput.current.value = ''
  };



  return (
    <div className="messages">
      <Header />
      
      <ReactScrollToBottom className="messages__list" id="message-list">

        <p>
        {  message.map((ele)=> <Message message={ele} />)   }
        </p>
       
      </ReactScrollToBottom>

      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
        emptyInput={emptyInput}
      />
    </div>
  );
}

export default Messages;
