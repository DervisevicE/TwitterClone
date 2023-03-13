import React from "react";
import './NewPost.css';
import Avatar from '../Avatar/Avatar';
const NewPost = () => {
    return (
        <div className="new_post">
            <Avatar />
            <form className="new_tweet" >
                <input className="new_post_text" type="text" name="name" placeholder="What's happening" />
                <input className="new_post_tweet" type="submit" value="Tweet" />
            </form>
        </div>
    );
}

export default NewPost;