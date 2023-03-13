import React from "react";
import './NewPost.css';
import Avatar from '../Avatar/Avatar';
const NewPost = () => {
    return (
        <div className="newPost">
            <Avatar />
            <form className="newTweet" >
                <input className="newPostText" type="text" name="name" placeholder="What's happening" />
                <input className="newPostTweet" type="submit" value="Tweet" />
            </form>
        </div>
    );
}

export default NewPost;