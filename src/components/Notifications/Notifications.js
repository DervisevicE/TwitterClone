import React from "react";
import './Notifications.css';
import Notification from "../Notification/Notification";

const Notifications = () => {
    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <Notification/>
        </div>
    );
}


export default Notifications;