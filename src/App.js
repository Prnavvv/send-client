import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Room from './Room';

const socket = io.connect("https://send-server.up.railway.app")

function App() {

  //show-hide toggles start
  const[showOptions, setShowOptions] = React.useState(false);//true
  const[showCreate, setShowCreate] = React.useState(true);//false
  const[showJoin, setShowJoin] = React.useState(false);
  const[roomJoined, setRoomJoined] = React.useState(false);
  //show-hide toggles end


  //states start
  const[room,setRoom] = React.useState(Math.floor(Math.random() * (9999 - 1000) ) + 1000);
  //states end

  //functions start

  const createRoom = () =>{
    socket.emit("create_room",room);
    setShowOptions(false);
    setShowCreate(true);
  }

  const enterJoinRoom = () => {
    setShowOptions(false);
    setShowJoin(true);
  }

  const joinRoom = () => {
    socket.emit("join_room",room);
    setShowJoin(false);
    setRoomJoined(true);
  }

  //functions end
  

  

  return (
    <div>
      <div className="header">
      <h1 className='heading'>SENDD</h1>
      </div>
      <div className='body'>

{
  showOptions?
      <div className="options">
        <button className='options-btn' onClick={createRoom}>CREATE ROOM</button>
        <button className='options-btn' onClick={enterJoinRoom}>JOIN ROOM</button>
      </div>
      :null
}
{
  showCreate?
  <Room socket={socket} room={room}/>
  :null
}
{
  showJoin?
  <>
  <label className='code-input-label'>Enter Room Code</label>
  <input className='code-input' onChange={(event)=>{setRoom(event.target.value)}}/>
  <button className='options-btn' onClick={joinRoom}>Join Room</button>
  </>
  :null
}
{
  roomJoined?
    <Room socket={socket} room={room}/>
    :null


}

      </div>{/*body div*/}
    </div>
  );
}

export default App;
