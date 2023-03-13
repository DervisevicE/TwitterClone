import React from "react";
import NewPost from "../NewPost/NewPost";
import Tweet from "../Tweet/Tweet";
import './Feed.css';


const Feed = () => {
    return(
        <div className="feed">
            <NewPost/>
            <Tweet/>
            <Tweet/>
            <Tweet/>
        </div>
    );
}

export default Feed;