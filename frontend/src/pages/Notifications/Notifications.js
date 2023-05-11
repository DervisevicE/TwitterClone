import React from "react";
import './Notifications.css';
import Notification from "../../components/Notification/Notification";
import LeftBar from "../../components/LeftBar/LeftBar";
import RightBar from "../../components/RightBar/RightBar";
import tweets from '../../data.json';

const Notifications = () => {
    return (

            <div className="notifications fade-in">
            <div className="title"><h2>Notifications</h2></div>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
        </div>

    );
}


export default Notifications;