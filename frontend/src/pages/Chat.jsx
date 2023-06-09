import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { host } from '../Apilinks/Apiroutes'
import Contact from '../Components/Contact'
import './sign.css'
import Welcome from '../Components/Welcome'
import Chatcontainer from '../Components/Chatcontainer'
import {io} from 'socket.io-client'


const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [currentuser, setCurrentuser] = useState(undefined);
  const [currentchat , setCurrentchat] = useState(undefined);

  useEffect(() => {
    const fetchdata = async () => {
      if (!localStorage.getItem("GET-CHAT-USER")) {
        navigate('/login')
      }
      else {
        setCurrentuser(await JSON.parse(localStorage.getItem("GET-CHAT-USER")))
      }
    }
    fetchdata()
  }, [navigate])

  useEffect(() => {
    if(currentuser){
      socket.current = io(host);
      socket.current.emit("add-user",currentuser._id);
    }
  }, [currentuser])
  


  useEffect(() => {
    const fetchdata = async () => {
      if (currentuser) {
        if (!currentuser.isAvatarImageSet) {
          navigate("/setAvatar");
        }
      }
    }
    fetchdata()
  }, [navigate, currentuser])

  const handlechat = (chat)=>{
    setCurrentchat(chat)
  }
  // contacts={contacts}

  return (
    <div className='CHAT'>
      <div className='chat-box'>
        <Contact changechat={handlechat} />
        {currentchat ===undefined ? <Welcome /> : <Chatcontainer currentchat={currentchat} socket={socket} />}
      </div>
    </div>
  )
}

export default Chat
