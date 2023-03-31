import React, { useState } from "react";
import './NewPost.css';
import Avatar from '../Avatar/Avatar';
const NewPost = (props) => {

    const [enteredText, setEnteredText] = useState("");

    const addTweetHandler = (event) => {
        event.preventDefault();
        const newTweet = {
            id: Math.random().toString(),
            user: "Active User",
            username: "@active.user",
            content: enteredText,
            likes: 0,
            comments: 0,
            reposts: 0
        };

        props.onAddTweet(newTweet);
        setEnteredText("");
    }

    const enteredTextHandler = (event) => {
        setEnteredText(event.target.value);
    }

    return (
        <div className="new_post">
            <Avatar />
            <form className="new_tweet" onSubmit={addTweetHandler}>
                <input className="new_post_text" type="text" name="text" placeholder="What's happening" onChange={enteredTextHandler} />
                <input className="new_post_tweet" type="submit" value="Tweet" />
            </form>
        </div>
    );
}

export default NewPost;