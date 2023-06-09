import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import './sign.css'
import { useAlert } from 'react-alert'
import { login } from '../Apilinks/Apiroutes'
import axios from 'axios'

const Login = () => {
  const alert = useAlert();
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    password: ""
  })
  const handlechange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  useEffect(() => {
   if(localStorage.getItem("GET-CHAT-USER")){
    navigate('/chat')
   }
  }, [navigate])
  
  const handlevalidation = () => {
    const { name, password} = values;
    if (name === "") {
      alert.error("Name and Password is required.");
      return false;
    } else if (password === "") {
      alert.error("Name and Password is required.");
      return false;
    }
    return true;
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (handlevalidation()) {
      const { name, password } = values;
      const { data } = await axios.post(login, {
        name,
        password,
      });
      if (data.status === false) {
        alert.error(data.msg);
      }
      if (data.status === true) {
        alert.success("Login Success")
        localStorage.setItem(
          "GET-CHAT-USER",
          JSON.stringify(data.user)
        );
        navigate("/chat");
      }
    }
  };
  return (
    <div className="signup">
      <form action="" onSubmit={handlesubmit}>
        <div className='logo_b'>
          <img src={Logo} alt="" />
          <h1>GET-CHAT</h1>
        </div>
        <input type='text' name="name" placeholder='Name' onChange={handlechange} />
        <input type='password' name="password" placeholder='Password' onChange={handlechange} />
        <button type="submit">Login User</button>
        <span>
          Don't have an account ? <Link to="/register">Register.</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
