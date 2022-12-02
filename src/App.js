import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Room from './Room';

const socket = io.connect("https://send-server.up.railway.app")

function App() {

  //show-hide toggles start
  const[showOptions, setShowOptions] = React.useState(true);//true
  const[showCreate, setShowCreate] = React.useState(false);//false
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
      <h1 className='heading'>SEND</h1>
      <div className='body'>

{
  showOptions?
      <div className="options">
        <button className='options-btn' onClick={createRoom}>Create Room</button>
        <button className='options-btn' onClick={enterJoinRoom}>Join Room</button>
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
  <label>Enter Room Code</label>
  <input onChange={(event)=>{setRoom(event.target.value)}}/>
  <button onClick={joinRoom}>Join Room</button>
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
