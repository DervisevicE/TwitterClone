import React from "react";
import Avatar from "../Avatar/Avatar";
import './Suggestion.css';
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';
import {Link} from 'react-router-dom';


const Suggestion = (props) => {

    const { user, dispatch } = useAuthContext();

    const handleFollow = async () => {
        const response = await fetch(apiURL + `/user/${props.user._id}/follow`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'FOLLOW_USER', payload: json })
        }
    }


    return (
        <div className="suggestion">
            <Link to={`/profile/${props.user._id}`}  className="details">
                <Avatar picture={props.user.profilePicture}/>
                <div className="names">
                    <div className="name_bold">{props.user.username}</div>
                    <div className="name">{props.user.username}</div>
                </div>
            </Link>
            <button className="follow_btn" onClick={handleFollow} >Follow</button>
        </div>
    );
}

export default Suggestion;