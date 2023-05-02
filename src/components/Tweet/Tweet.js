import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import './Tweet.css'
import like from '../../assets/like.png';
import liked from '../../assets/liked.png';
import comment from '../../assets/comment.png';
import repost from '../../assets/repost.png';


const Tweet = (props) => {

    const [likes, setLikes] = useState(props.tweet.likes);
    const [isClicked, setIsClicked] = useState(false);

    const updateLikesHandler = () => {
        setIsClicked(!isClicked);
        if (!isClicked) {
            const newLikesNumber = likes + 1;
            setLikes(newLikesNumber);
            return;
        }
        const newLikesNumber = likes - 1;
        setLikes(newLikesNumber);
    }

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
                <div onClick={updateLikesHandler}><img src={isClicked ? liked : like} alt="like" /> </div> <p className={isClicked ? "updated" : ""}>{likes}</p>
                <div><img src={comment} alt="comment" /> </div> <p>{props.tweet.comments}</p>
                <div><img src={repost} alt="repost" /> </div> <p>{props.tweet.reposts}</p>
            </div>
        </div>
    );
};


export default Tweet;