import React,{useState,useEffect} from 'react'
import Robo from '../assets/robot.gif'
import './style.css'

const Welcome = () => {
  const [username,setUsername] = useState("");
  useEffect(() => {
    const fetchdata = async()=>{
      setUsername(await JSON.parse(localStorage.getItem("GET-CHAT-USER")).name)
    }
    fetchdata()
  }, [])
  
  return (
    <div className='welcome'>
      <img src={Robo} alt="" />
      <h1>
        Welcome <span>{username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  )
}

export default Welcome
