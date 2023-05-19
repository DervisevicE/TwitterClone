import React, { useState } from "react";
import './NewPost.css';
import Avatar from '../Avatar/Avatar';
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTweetsContext } from "../../hooks/useTweetsContext";


const NewPost = () => {

    const [enteredText, setEnteredText] = useState("");
    const { dispatch } = useTweetsContext();
    const { user } = useAuthContext();

    const addTweetHandler = async (e) => {
        e.preventDefault();

        const response = await fetch(apiURL + '/tweets', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: enteredText })
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'CREATE_TWEET', payload: json })
        }

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