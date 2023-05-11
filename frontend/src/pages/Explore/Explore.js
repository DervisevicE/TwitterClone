import React from "react";
import './Explore.css'
import Notification from '../../components/Notification/Notification'
import LeftBar from "../../components/LeftBar/LeftBar";
import RightBar from "../../components/RightBar/RightBar";
import tweets from '../../data.json';

const Explore = () => {
    return(
            <div className="explore fade-in">
                <div className="title"><h2>Explore</h2></div>
                <Notification/>
            </div>
    );
}

export default Explore;