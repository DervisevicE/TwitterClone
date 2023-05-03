import React from "react";
import './Avatar.css'
import avatar from '../../assets/avatar.jpg';

const Avatar = () => {
    return(
        <div className="avatar">
            <img className="avatar_img" src={avatar} alt="avatar"/>
        </div>
    );
}


export default Avatar;