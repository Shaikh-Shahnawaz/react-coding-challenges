import React from 'react';
import cx from 'classnames';
import { Socket } from 'socket.io-client';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';


const ME = 'me';

export default function Message({ nextMessage, message, botTyping }) {


  return (
    <>
    {/* ------bot message------ */}
    <p
      className={cx(
        'messages__message',
        'animate__animated animate__rubberBand',
        {
          // 'messages__message--me': message.user === ME,
          // 'messages__message--last': (!nextMessage && (!botTyping || message.user === ME))
          //   || (nextMessage && nextMessage.user !== message.user)
          'messages__message--me': message === ME,
          'messages__message--last': (!nextMessage && (!botTyping || message === ME))
            || (nextMessage && nextMessage !== message)
        }
      )}
      key={message.id}
    >
      {/* {message.message} */}

      {initialBottyMessage}
     
      {/* <p>{`${message.user}:${message}`}</p> */}
        
    </p>
    {/* -------user msg------- */}
      <p className="message--me" style={{
        borderTopLeftRadius:'20px',
        borderTopRightRadius:'25px',
        borderBottomLeftRadius:'20px',
        width:'20%',
        padding:'12px' ,
        color: 'white' ,
        backgroundColor:'#3898EB',
        height:'auto',
        wordWrap:'break-word',
        display:'block',
        position:'relative',
        right:'-750px',
        }}> <strong> {`${message}`} </strong> </p>
    

    </>
  );
}


