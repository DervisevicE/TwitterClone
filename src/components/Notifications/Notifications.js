import React from "react";
import './Notifications.css';
import Notification from "../Notification/Notification";

const Notifications = () => {
    return (
        <div className="notifications">
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