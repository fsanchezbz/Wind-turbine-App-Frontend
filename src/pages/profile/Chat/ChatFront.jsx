import React, {useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from './Chat';
import axios from 'axios';
const socket = io.connect(`${import.meta.env.VITE_PRODUCTION_API}`);



const ChatFront = () => {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [users, setUsers] = useState([]);


  const joinRoom = () => {
    
    
    setUsername(users.firstName);
    
    console.log('useState roomID',roomID)
    console.log('useState username',username)

    if (roomID !== "" ){
   
    
    socket.emit("join_room", roomID);
    setShowChat(true);
    }
    

  };


  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PRODUCTION_API}/users/me`, { withCredentials: true });
        setUsers(response.data); // Store the entire user object
        setRoomID(`${import.meta.env.VITE_SECRET_ROOMID}`);
      } catch (error) {
        console.log(error);
        setUsers(null);
      }
    };

    fetchLoggedInUser();
  }, []);


  return (
    <>
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <button onClick={joinRoom}>Join CHAT </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={roomID} />
      )}
      </div>
    </>
  );
}

export default ChatFront;
