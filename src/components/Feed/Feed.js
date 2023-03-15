import React from "react";
import NewPost from "../NewPost/NewPost";
import Tweet from "../Tweet/Tweet";
import './Feed.css';


const Feed = (props) => {
    return (
        <div className="feed">
            <h2>Home</h2>
            <NewPost />
            {props.tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
}

export default Feed;