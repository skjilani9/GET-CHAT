import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import './sign.css'

const Home = () => {
    const navigate = useNavigate();
    const handlechat = ()=>{
        navigate('/chat')
    }
    const handlelogin = ()=>{
        navigate('/login')
    }
    const handleregister = ()=>{
        navigate('/register')
    }

    return (
        <div className='home'>
            <div className='home_sec'>
                <div className='home-ico'>
                    <img src={Logo} alt="" />
                    <h1>Get-Chat</h1>
                </div>
                <div className="home-btn">
                    <button onClick={handlechat}>Chat</button>
                </div>
                <div className="home-btn">
                    <div className='sig-btn'>
                        <button onClick={handlelogin}>Login</button>
                        <button onClick={handleregister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
