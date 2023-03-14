import React from "react";
import Avatar from "../Avatar/Avatar";
import './Tweet.css'
import like from './like.png';
import comment from './comment.png';
import repost from './repost.png';


const Tweet = (props) => {
    return (
        <div className="tweet">
            <div className="user_details">
                <Avatar />
                <p className="username_bold">{props.tweet.user}</p>
                <p className="username">{props.tweet.username}</p>
            </div>
            <p className="content"> {props.tweet.content}
            </p>
            <div className="interactions">
                <div><img src={like} alt="like" /></div>
                <div><img src={comment} alt="comment" /></div>
                <div><img src={repost} alt="repost" /></div>
            </div>
        </div>
    );
};


export default Tweet;