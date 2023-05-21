import React, { useState, useEffect } from "react";
import './Explore.css'
import { useAuthContext } from "../../hooks/useAuthContext";
import { apiURL } from "../../constants";
import Tweet from "../../components/Tweet/Tweet";

const Explore = () => {
    const { user, randomUsers, dispatch } = useAuthContext();
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchRandomUsers = async () => {
            if (user && user.token) {
                const response = await fetch(apiURL + '/user/random', {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'RANDOM_USERS', payload: json });
                }
            }
        };

        fetchRandomUsers();

        randomUsers &&
            randomUsers.forEach(async (author) => {
                const response = await fetch(apiURL + `/tweets/${author._id}`, {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                });
                const json = await response.json();

                if (response.ok) {
                    setTweets((prev) => [...prev, ...json]);
                }
            });
    }, []);

    // Create a uniqueTweets array with unique tweet IDs
    const uniqueTweets = Array.from(new Set(tweets.map((tweet) => tweet._id))).map(
        (id) => tweets.find((tweet) => tweet._id === id)
    );

    return (
        <div className="explore fade-in">
            <div className="title">
                <h2>Explore</h2>
            </div>
            {uniqueTweets.map((tweet) => (
                <Tweet key={tweet._id} tweet={tweet} />
            ))}
        </div>
    );
};

export default Explore;
