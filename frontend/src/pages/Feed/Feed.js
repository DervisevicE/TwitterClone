import React, { useContext } from "react";
import NewPost from "../../components/NewPost/NewPost";
import Tweet from "../../components/Tweet/Tweet";
import './Feed.css';
import { DataContext } from "../../DataProvider";
import LeftBar from "../../components/LeftBar/LeftBar";
import RightBar from "../../components/RightBar/RightBar";
import tweets from '../../data.json';


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