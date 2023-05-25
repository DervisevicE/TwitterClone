import React from "react";
import './Avatar.css'
import avatar from '../../assets/avatar.jpg';

const Avatar = (props) => {
    return(
        <div className="avatar">
            <img className="avatar_img" src={props.picture} alt="avatar"/>
        </div>
    );
}


export default Avatar;