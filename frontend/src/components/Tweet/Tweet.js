import React, { useState, useEffect } from "react";
import Avatar from "../Avatar/Avatar";
import './Tweet.css'
import like from '../../assets/like.png';
import liked from '../../assets/liked.png';
import comment from '../../assets/comment.png';
import repost from '../../assets/repost.png';
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLikesContext } from '../../hooks/useLikesContext';

const Tweet = (props) => {
    const [author, setAuthor] = useState(null);
    const userId = props.tweet.author;
    const { user } = useAuthContext();
    const { likes, dispatch } = useLikesContext();

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const response = await fetch(apiURL + `/user/${userId}`);

                if (response.ok) {
                    const userData = await response.json();
                    setAuthor(userData);
                } else {
                    console.error('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);


    const userLiked = props.tweet.likes.find(like => like.user === user._id)

    const [likeId, setLikeId] = useState(props.tweet.likes.find(like => like.user === user._id));
    const [likesNumber, setLikes] = useState(props.tweet.likes.length);
    const [isClicked, setIsClicked] = useState(userLiked);
    const [likeLoading, setLikeLoading] = useState(false);



    const updateLikesHandler = async () => {
        if (likeLoading) {
            return;
        }
        setLikeLoading(true);
        setIsClicked(!isClicked);
        if (!isClicked) {
            const response = await fetch(apiURL + '/likes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tweet: props.tweet._id })
            })

            const json = await response.json()
            console.log(json)
            console.log(JSON.stringify(json))
            if (response.ok) {
                dispatch({ type: 'SET_LIKES', payload: json })
                setLikes(likesNumber + 1)
                setLikeId(json._id)
            }
        }

        else {
            const response = await fetch(apiURL + `/likes/${likeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            })


            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'DElETE_LIKE', payload: json })
                setLikes(likesNumber - 1)
            }
        }
        setLikeLoading(false);
    }

    console.log(likesNumber)
    return (
        <div className="tweet">
            <div className="user_details">
                <Avatar />
                <p className="username_bold">{author && author.username}</p>
                <p className="username">{author && author.username}</p>
            </div>
            <p className="content"> {props.tweet.content}
            </p>
            <div className="interactions">
                <div onClick={updateLikesHandler} disabled={likeLoading}><img src={isClicked ? liked : like} alt="like" /> </div> <p className={isClicked ? "updated" : ""}>{likesNumber}</p>
                <div><img src={comment} alt="comment" /> </div> <p>{props.tweet.comments.length}</p>
                <div><img src={repost} alt="repost" /> </div> <p>{props.tweet.reposts.length}</p>
            </div>
        </div>
    );
};


export default Tweet;