import React, { useState } from "react";
import NewPost from "../NewPost/NewPost";
import Tweet from "../Tweet/Tweet";
import './Feed.css';


const Feed = (props) => {

    const [allTweets, setTweets] = useState(props.tweets);

    const addTweetHandler = (tweet) => {
        setTweets(prevTweets => {
            return [tweet, ...prevTweets];
        });
    }
    return (
        <div className="feed">
            <div className="title"><h2>Home</h2></div>
            <NewPost onAddTweet={addTweetHandler} />
            {allTweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
}

export default Feed;