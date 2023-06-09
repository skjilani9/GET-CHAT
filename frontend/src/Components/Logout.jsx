import React from 'react'
import {useNavigate} from 'react-router-dom'
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logout } from '../Apilinks/Apiroutes';
import './style.css'

const Logout = () => {
  const navigate= useNavigate();

  const handleclick = async()=>{
    const id = await JSON.parse(localStorage.getItem("GET-CHAT-USER"))._id
    const data = await axios.get(`${logout}/${id}`)
    if(data.status===200){
      localStorage.clear();
      navigate('/login')
    }
  }

  return (
    <div className='logout'>
      <button onClick={handleclick}>
        <BiPowerOff />
      </button>
    </div>
  )
}

export default Logout
