import React, {useState, useEffect} from "react";
import './Notification.css';
import Avatar from "../Avatar/Avatar";
import {apiURL} from "../../constants";
import {useAuthContext} from '../../hooks/useAuthContext';

const Notification = (props) => {
    
    const [photo, setPhoto] = useState('');
    const {user} = useAuthContext();

    useEffect(() => {
        const getUserById = async () => {
            if (user && user.token) {
                fetch(apiURL + `/user/${props.notification.sender}/`, {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                }).then(value => {
                    value.json().then(author => {
                        setPhoto(author.profilePicture)
                    })
                })
            }
        }
        getUserById();
    }, [user])


    return (
        <div className="notification">
            <Avatar picture = {photo} />
            <div className="notification_content">
                <p>{props.notification.message}</p>
            </div>
        </div>
    );
}

export default Notification;