import React from "react";
import Avatar from "../Avatar/Avatar";
import './Suggestion.css';


const Suggestion = (props) => {
    return (
        <div className="suggestion">
            <div className="details">
                <Avatar />
                <div className="names">
                    <div className="name_bold">{props.tweet.user}</div>
                    <div className="name">{props.tweet.username}</div>
                </div>
            </div>
            <button className="follow_btn">Follow</button>
        </div>
    );
}

export default Suggestion;