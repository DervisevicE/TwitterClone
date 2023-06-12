import React, { useState, useEffect } from "react";
import './Notifications.css';
import Notification from "../../components/Notification/Notification";
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';

const Notifications = () => {

    const { user } = useAuthContext();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch(apiURL + '/notifications', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                setNotifications(json)
            }
        }

        if (user) {
            fetchNotifications()
        }
    }, [user])

    return (
        <div className="notifications fade-in">
            <div className="title"><h2>Notifications</h2></div>
            {notifications && notifications.map((notification) => (
                <Notification key={notification._id} notification={notification} />
            ))}
        </div>
    );
}


export default Notifications;