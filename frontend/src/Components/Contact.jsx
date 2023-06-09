import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo.svg'
import './style.css'
import axios from 'axios';
import { getfriend,getuser } from '../Apilinks/Apiroutes'
import {useAlert} from 'react-alert'

const Contact = ({ changechat }) => {
    const alert = useAlert();
    const [currentusername, setCurrentusername] = useState(undefined);
    const [currentuserimage, setCurrentuserimage] = useState(undefined);
    const [currentselect, setCurrentselect] = useState(undefined);
    const [value, setValue] = useState("")
    const [contact, Setcontact] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const data = await JSON.parse(localStorage.getItem("GET-CHAT-USER"))
            setCurrentusername(data.name)
            setCurrentuserimage(data.avatarImage)
        }
        fetchdata();
    }, [])

    const handlesearch = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const changecurrentchat = (item, index) => {
        setCurrentselect(index)
        changechat(item)
    }
    const Handlsubmit = async (e) => {
        try {
            e.preventDefault();
            const { search } = value
            if(search.length===0){
                alert.error("Please enter a valid name")
            }
            const mine = await JSON.parse(localStorage.getItem("GET-CHAT-USER"))._id
            const data = {
                name: search
            }
            const response = await axios.post(`${getfriend}/${mine}`, data)
            if(response.data.status ===200){
                alert.success(response.data.message)
            }  
            else{
                alert.error(response.data.message)
            }          
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
      const fetchdata = async()=>{
        const mine = await JSON.parse(localStorage.getItem("GET-CHAT-USER"))._id
        const response = await axios.get(`${getuser}/${mine}`)
        const frs = await response.data.friends
        Setcontact(frs)
      }
      fetchdata()
    }, [])

    return (
        <div className='grid_block'>
            {currentuserimage && currentusername && (
                <div>
                    <div className="brand">
                        <img src={Logo} alt="" />
                        <h3>GET-CHAT</h3>
                    </div>
                    <div className="contact">
                        <form action="" onSubmit={Handlsubmit}>
                            <input type="text" name="search" placeholder='search a friend' onChange={handlesearch} />
                            <button type="submit">search</button>
                        </form>
                        {contact.length ===0 ? <h1>No Friends</h1> : contact.map((item, index) => {
                            return (
                                <div key={item.Id} className={`contacts ${index === currentselect ? "selected" : ""
                                    }`} onClick={()=>changecurrentchat(item, index)}>
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${item.avatarImage}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{item.name}</h3>
                                    </div>
                                </div>
                            )
                        }) }
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currentuserimage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h2>{currentusername}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Contact
