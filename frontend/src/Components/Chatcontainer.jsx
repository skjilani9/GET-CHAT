import React, { useState, useEffect, useRef } from 'react'
import Chatinput from './Chatinput.jsx'
import axios from 'axios'
import { sendmsg, recivemsg } from '../Apilinks/Apiroutes.js'
import { v4 as uuidv4 } from 'uuid'
import Logout from './Logout.jsx'
import './style.css'

const Chatcontainer = ({ currentchat, socket }) => {
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scroll = useRef();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await JSON.parse(localStorage.getItem("GET-CHAT-USER"))
      const response = await axios.post(recivemsg, {
        from: data._id,
        to: currentchat.Id
      })
      setMessage(response.data)
    }
    fetchdata()
  }, [currentchat])

  useEffect(() => {
    const fetchdata = async () => {
      if (currentchat) {
        await JSON.parse(localStorage.getItem("GET-CHAT-USER"))._id
      }
    }
    fetchdata()
  }, [currentchat])

  const handlemsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("GET-CHAT-USER"))
    socket.current.emit("send-msg", {
      to: currentchat.Id,
      from: data._id,
      msg
    })
    await axios.post(sendmsg, {
      from: data._id,
      to: currentchat.Id,
      message: msg,
    })
    const msgs = [...message];
    msgs.push({ fromSelf: true, message: msg });
    setMessage(msgs)
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className='chat_cont'>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentchat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentchat.name}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {message.map((message) => {
          return (
            <div ref={scroll} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Chatinput handlemsg={handlemsg} />
    </div>
  )
}

export default Chatcontainer
