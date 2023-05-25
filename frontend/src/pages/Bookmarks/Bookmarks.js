import React, { useState, useEffect } from "react";
import './Bookmarks.css';
import { useAuthContext } from "../../hooks/useAuthContext";
import { apiURL } from "../../constants";
import Tweet from "../../components/Tweet/Tweet";


const Bookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const [bookmarkTweets, setBookmarkTweets] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {

        const fetchBookmarks = async () => {
            if (user && user.token) {
                fetch(apiURL + `/bookmarks`, {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                }).then(value => {
                    value.json().then(bookmark => {
                        setBookmarks(bookmark);
                    })
                })
            }
        };





        // bookmarks && bookmarks.forEach(async (bookmark) => {
        //     const response = await fetch(apiURL + `/tweets?id=${bookmark.tweet}`, {
        //         headers: { 'Authorization': `Bearer ${user.token}` },
        //     });
        //     const json = await response.json();
        //     if (response.ok) {
        //         setBookmarkTweets((prev) => [...prev, json]);
        //     }
        // });


        fetchBookmarks();

    }, []);

    useEffect(() => {
        const fetchBookmarkTweets = async () => {
            if (user && user.token && bookmarks.length > 0) {
              const tweetIds = bookmarks.map(bookmark => bookmark.tweet);

              for (const tweetId of tweetIds) {
                const response = await fetch(apiURL + `/tweets?id=${tweetId}`, {
                  headers: { 'Authorization': `Bearer ${user.token}` },
                });
                const json = await response.json();
                if (response.ok) {
                  setBookmarkTweets(prev => [...prev, json]);
                }
              }
            }
          };

            fetchBookmarkTweets();
    }, [user, bookmarks]);

    const uniqueTweets = Array.from(new Set(bookmarkTweets.map((tweet) => tweet._id))).map(
        (id) => bookmarkTweets.find((tweet) => tweet._id === id)
    );

    return (

        <div className="bookmarks fade-in">
            <div className="title"><h2>Bookmarks</h2></div>
            {uniqueTweets && uniqueTweets.map((tweet) => (
                <Tweet key={tweet._id} tweet={tweet} />
            ))}
        </div>

    );
}

export default Bookmarks;