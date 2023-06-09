import React, { useState } from 'react'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from 'emoji-picker-react'
import './style.css'

const Chatinput = ({ handlemsg }) => {
  const [msg, setMsg] = useState("");
  const [emojipic, setEmojipic] = useState(false);

  const handleemoji = () => {
    setEmojipic(!emojipic)
  }

  const sendchat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handlemsg(msg)
      setMsg('')
    }
  }

  return (
    <div className='send-mgs'>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleemoji} />
          {emojipic && <div className='emoji-size'><Picker onEmojiClick={(emojiObject)=>setMsg((prevMsg)=>prevMsg + emojiObject.emoji)} /></div>}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendchat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  )
}

export default Chatinput
