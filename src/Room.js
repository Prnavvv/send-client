import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';


function Room({ socket, room, setShowOptions, setShowCreate, setRoomJoined, setRoom }) {


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

  const sendOnEnter = (event)=> {
    console.log(event.key);
    if(event.key==='Enter'){
      sendMessage();
    }
  }

  const back = () => {
    setRoom(String(Math.floor(Math.random() * (9999 - 1000) ) + 1000));
    
    setShowCreate(false);
    setRoomJoined(false);
    setShowOptions(true);
  }

  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received", data);
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
        <input id='msg-input' placeholder='Type something' onChange={(event) => { setCurrentMessage(event.target.value) }} onKeyDown={sendOnEnter}/>

        <button onClick={sendMessage} className='send-btn'>
          Send
        </button>
      </div>
      <p className='back' onClick={back}>Back</p>

    </div>
  )
}

export default Room