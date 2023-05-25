import React from "react";
import Avatar from "../Avatar/Avatar";
import './Suggestion.css';
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';


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
            <div className="details">
                <Avatar picture={props.user.profilePicture}/>
                <div className="names">
                    <div className="name_bold">{props.user.username}</div>
                    <div className="name">{props.user.username}</div>
                </div>
            </div>
            <button className="follow_btn" onClick={handleFollow} >Follow</button>
        </div>
    );
}

export default Suggestion;