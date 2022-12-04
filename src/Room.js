import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';


function Room({ socket, room }) {


  const [currentMessage, setCurrentMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  let inp_field = document.getElementById('msg-input');
  

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        message: currentMessage,
      };

      console.log(messageData);

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }

    inp_field.value = "";
  };

  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);


  return (
    <div className='msg-container'>
      <h1 className='room-id'>Room id : {room}</h1>
      <div className='chat-box'>
        <ScrollToBottom className="message-container message-container">
          {messageList.map((messageContent) => {
            return (

                  <div className='message'>{messageContent.message}</div>
             
            );
          })}
        </ScrollToBottom>

      </div>

      <div className="chat-footer">
        <input id='msg-input' placeholder='Type something' onChange={(event) => { setCurrentMessage(event.target.value) }}/>

        <button onClick={sendMessage} className='send-btn'>
          Send
        </button>
      </div>

    </div>
  )
}

export default Room