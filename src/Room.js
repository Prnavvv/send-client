import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';


function Room({ socket, room }) {


    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
          const messageData = {
            room: room,
            message: currentMessage,
          };
    
          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
        }
      };

      React.useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);


    return (
        <div>
            <h1>Room id : {room}</h1>
            <div className='chat-box'>
            <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  
                </div>
              
            );
          })}
        </ScrollToBottom>

            </div>

            <div className="chat-footer">
                <input placeholder='Type something' onChange={(event)=>{setCurrentMessage(event.target.value)}} onK/>

                <button onClick={sendMessage} className='send-btn'>
                &#9658;
                </button>
            </div>

        </div>
    )
}

export default Room