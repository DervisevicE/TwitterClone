import React, { useContext } from "react";
import NewPost from "../NewPost/NewPost";
import Tweet from "../Tweet/Tweet";
import './Feed.css';
import { DataContext } from "../../DataProvider";


const Feed = () => {

    const {data, updateData} = useContext(DataContext);
    console.log(data)

    const addTweetHandler = (newTweet) => {
        console.log(newTweet);
        updateData([
            newTweet,
            ...data
        ]);
      };
      
      
    return (
        <div className="feed fade-in">
            <div className="title"><h2>Home</h2></div>
            <NewPost onAddTweet={addTweetHandler} />
            {data.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
}

export default Feed;