import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import './sign.css'
import { useAlert } from 'react-alert'
import { register } from '../Apilinks/Apiroutes'
import axios from 'axios'

const Register = () => {
    const alert = useAlert();
    const navigate = useNavigate()
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirm: ""
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
        const { name, email, password, confirm } = values;
        if (password !== confirm) {
            alert.error("Password and confirm password should be same.")
            return false
        }
        else if (name.length < 3) {
            alert.error("UserName should be greater than 5.")
            return false
        }
        else if (password.length < 8) {
            alert.error("Password should be greater than 8.")
            return false
        }
        else if (email === "" || password === "" || name === "" || confirm === "") {
            alert.error("Please fill all required fields..")
            return false
        }
        return true;
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (handlevalidation()) {
            const { email, name, password } = values;
            const { data } = await axios.post(register, {
                email,
                name,
                password
            })
            if (data.status === false) {
                alert.error(data.msg)
            }
            if (data.status === true) {
                alert.success("Register successfully");
                localStorage.setItem("GET-CHAT-USER", JSON.stringify(data.user))
                navigate("/chat")
            }
        }
    }
    return (
        <div className="signup">
            <form action="" onSubmit={handlesubmit}>
                <div className='logo_b'>
                    <img src={Logo} alt="" />
                    <h1>GET-CHAT</h1>
                </div>
                <input type="text" name="name" placeholder='Name' onChange={handlechange} />
                <input type='email' name="email" placeholder='Email' onChange={handlechange} />
                <input type='password' name="password" placeholder='Password' onChange={handlechange} />
                <input type='password' name="confirm" placeholder='Confirm Password' onChange={handlechange} />
                <button type="submit">Create User</button>
                <span>
                    Already have an account ? <Link to="/login">Login.</Link>
                </span>
            </form>
        </div>
    )
}

export default Register
