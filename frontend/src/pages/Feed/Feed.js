import React, { useEffect } from "react";
import NewPost from "../../components/NewPost/NewPost";
import Tweet from "../../components/Tweet/Tweet";
import './Feed.css';
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTweetsContext } from '../../hooks/useTweetsContext.js';

const Feed = () => {

    const { tweets, dispatch } = useTweetsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchTweets = async () => {
            const response = await fetch(apiURL + '/tweets', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_TWEETS', payload: json })
            }
        }

        if (user) {
            fetchTweets()
        }
    }, [dispatch, user])

    const addTweetHandler = (newTweet) => {
        // console.log(newTweet);
        // updateData([
        //     newTweet,
        //     ...data
        // ]);
    };


    return (

        <div className="feed fade-in">
            <div className="title"><h2>Home</h2></div>
            <NewPost onAddTweet={addTweetHandler} />
            {tweets && tweets.map((tweet) => (
                <Tweet key={tweet._id} tweet={tweet} />
            ))}
        </div>

    );
}

export default Feed;