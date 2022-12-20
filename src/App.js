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
  const[room,setRoom] = React.useState(String(Math.floor(Math.random() * (9999 - 1000) ) + 1000));
  //states end

  //functions start

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const createRoom = async() => {
    
    socket.emit("join_room",room);

   

    
    setShowOptions(false);
    setShowCreate(true);
    console.log(room,socket);
  }

  const enterJoinRoom = () => {
    setShowOptions(false);
    setShowJoin(true);
  }

  const joinRoom = () => {
    socket.emit("join_room",room);
    setShowJoin(false);
    setRoomJoined(true);
    console.log(room,socket);
  }

  const back = () => {
    setShowOptions(true);
    setShowJoin(false);
  }

  /*React.useEffect(() => {
    console.log(room);
    setRoom(String(Math.floor(Math.random() * (9999 - 1000) ) + 1000));
    console.log(room);
  },[showOptions])*/

  //functions end
  
  return (
    <div>
      <div className="header">
      <h1 className='heading'>Cheat On Me</h1>
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
  
  <Room socket={socket} room={room} setShowOptions={setShowOptions} setShowCreate={setShowCreate} setRoomJoined={setRoomJoined} setRoom={setRoom}/>
  :null
}
{
  showJoin?
  <>
  <label className='code-input-label'>Enter Room Code</label>
  <input className='code-input' onChange={(event)=>{setRoom(event.target.value)}}/>
  <button className='options-btn' onClick={joinRoom}>Join Room</button>
  <p className='back' onClick={back}>Back</p>
  </>
  :null
}
{
  roomJoined?
    <Room socket={socket} room={room} setShowOptions={setShowOptions} setShowCreate={setShowCreate} setRoomJoined={setRoomJoined} setRoom={setRoom}/>
    :null


}

      </div>{/*body div*/}
      <p className='credits'>Developed by<a href='https://github.com/Prnavvv' target='_blank' > Pranav</a></p>
    </div>

    
  );
}

export default App;
