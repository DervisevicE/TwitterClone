import React from "react";
import NewPost from "../NewPost/NewPost";
import Tweet from "../Tweet/Tweet";


const Feed = (props) => {
    return (
        <div className="feed">
            <NewPost />
            {props.tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
}

export default Feed;