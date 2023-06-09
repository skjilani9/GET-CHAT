import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'
import loader from '../assets/loader.gif'
import { setavatar } from '../Apilinks/Apiroutes'
import './sign.css'


const SetAvatar = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const api = `https://api.multiavatar.com/4645046`;
    const [avatars, setAvatars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectavatar, setSelectavatar] = useState(undefined);

    useEffect(() => {
      if(!localStorage.getItem("GET-CHAT-USER")){
        navigate('/login')
      }
    }, [navigate])
    


    const setprofilepic = async () => {
        if (selectavatar === undefined) {
            alert.error("Please select an avatar")
        }
        else {
            const user = await JSON.parse(
                localStorage.getItem("GET-CHAT-USER")
            );
            const { data } = await axios.post(`${setavatar}/${user._id}`,
                { image: avatars[selectavatar] })
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    "GET-CHAT-USER",
                    JSON.stringify(user)
                );
                navigate("/chat");
            } else {
                alert.error("Error setting avatar. Please try again.");
            }
        }
    }


    useEffect(() => {
        const fetchdata = async () => {
            const data = []
            for (let i = 0; i < 4; i++) {
                const img = await axios.get(`${api}/${Math.round(Math.random() * 100)}`);
                const buffer = new Buffer(img.data);
                data.push(buffer.toString('base64'))
            }
            setAvatars(data);
            setLoading(false)
        }
        fetchdata();
    }, [api])


    return (
        <>
            {loading ? (<div className='set_avatar'><img src={loader} alt="loading" className='loader' /></div>) :(
                <div className='set_avatar'>
                    <div className="title_avatar">
                        <h1>Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((item,index)=>{
                            return(
                                <div className={`avatar ${selectavatar === index ? "Selected":""}`}>
                                    <img src={`data:image/svg+xml;base64,${item}`} alt="avatar" key={item} onClick={()=>setSelectavatar(index)} />
                                </div>
                            )
                        })}
                    </div>
                    <button className='avatar_btn' onClick={setprofilepic}>Set Profile picture</button>
                </div>
            )}
        </>
    )
}

export default SetAvatar
