import React, { useState } from "react";
import './NewPost.css';
import Avatar from '../Avatar/Avatar';
import { apiURL } from "../../constants";
const NewPost = (props) => {

    const [enteredText, setEnteredText] = useState("");

    const addTweetHandler = async (e) => {
        e.preventDefault();

        const newTweet = { content: enteredText };

        const user = localStorage.getItem('user');

        const response = await fetch(apiURL + "/tweets", {  
            method: "POST",
            body: JSON.stringify(newTweet),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
        });

        const data = await response.json();
        console.log(data);

        // props.onAddTweet(newTweet);
        setEnteredText("");
    }

    return (
        <div className="new_post">
            <Avatar />
            <form className="new_tweet" onSubmit={addTweetHandler}>
                <input
                    className="new_post_text"
                    type="text" name="text"
                    placeholder="What's happening"
                    onChange={(e) => setEnteredText(e.target.value)}
                    value={enteredText} />
                <input
                    className="new_post_tweet"
                    type="submit"
                    value="Tweet" />
            </form>
        </div>
    );
}

export default NewPost;