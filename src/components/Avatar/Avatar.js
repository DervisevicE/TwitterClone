import React from "react";
import './Avatar.css'
import avatar from './avatar.jpg'

const Avatar = () => {
    return(
        <div className="avatar">
            <img className="avatarImg" src={avatar} alt="avatar"/>
        </div>
    );
}


export default Avatar;