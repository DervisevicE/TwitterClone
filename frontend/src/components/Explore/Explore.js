import React from "react";
import './Explore.css'
import Notification from '../Notification/Notification'

const Explore = () => {
    return(
        <div className="explore fade-in">
            <div className="title"><h2>Explore</h2></div>
            <Notification/>
        </div>
    );
}

export default Explore;