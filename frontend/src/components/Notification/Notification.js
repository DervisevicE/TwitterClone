import React from "react";
import './Notification.css';
import Avatar from "../Avatar/Avatar";

const Notification = () => {
    return (
        <div className="notification">
            <Avatar />
            <div className="notification_content">
                <p>This is content of my notification. Bla bla bla bla bla.
                    This is content of my notification. Bla bla bla bla bla.
                    This is content of my notification. Bla bla bla bla bla.
                    This is content of my notification. Bla bla bla bla bla.</p>
            </div>
        </div>
    );
}

export default Notification;