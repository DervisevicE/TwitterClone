import React, { useEffect, useState, useRef } from "react";
import Avatar from "../Avatar/Avatar";
import './Tweet.css'
import like from '../../assets/like.png';
import liked from '../../assets/liked.png';
import comment from '../../assets/comment.png';
import repost from '../../assets/repost.png';
import bookmark from '../../assets/bookmark.png';
import bookmarked from '../../assets/bookmarked.png';
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLikesContext } from '../../hooks/useLikesContext';
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";
import { useCommentsContext } from "../../hooks/useCommentsContext";
import { useBookmarksContext } from "../../hooks/useBookmarksContext";

const Tweet = (props) => {

    const { user } = useAuthContext();
    const { dispatch } = useLikesContext();
    const { comments, commentsDispatch } = useCommentsContext()
    const { bookmarkDispatch } = useBookmarksContext()

    const userLiked = props.tweet.likes.find(like => like.user === user._id)
    const userBookmarked = props.tweet.bookmarks.find(bookmark => bookmark.user === user._id)

    const [likeId, setLikeId] = useState(props.tweet.likes.find(like => like.user === user._id));
    const [likesNumber, setLikes] = useState(props.tweet.likes.length);
    const [isClicked, setIsClicked] = useState(userLiked);

    const [likeLoading, setLikeLoading] = useState(false);
    const [showComments, setShowComments] = useState(false)
    const [author, setAuthor] = useState('')
    const [photo, setPhoto] = useState('')

    const [isBookmarked, setIsBookmarked] = useState(userBookmarked);
    const [bookmarkId, setBookmarkId] = useState(props.tweet.bookmarks.find(bookmark => bookmark.user === user._id));
    const [bookmarkLoading, setBookmarkLoading] = useState(false);


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


    const showCommentsHandler = async () => {
        setShowComments(!showComments);

        if (!showComments) {
            if (props.tweet.comments.length !== 0) {
                const response = await fetch(apiURL + `/comments/${props.tweet._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const json = await response.json();

                if (response.ok) {
                    commentsDispatch({ type: 'SET_COMMENTS', payload: json });
                }
            } else {
                commentsDispatch({ type: 'SET_COMMENTS', payload: [] });
            }
        }
    };

    const bookmarkTweetHandler = async () => {
        if (bookmarkLoading) {
            return;
        }
        setBookmarkLoading(true);
        setIsBookmarked(!isBookmarked);

        if (!isBookmarked) {
            const response = await fetch(apiURL + '/bookmarks', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tweet: props.tweet._id })
            })

            const json = await response.json()

            if (response.ok) {
                bookmarkDispatch({ type: 'SET_BOOKMARKS', payload: json })
                setBookmarkId(json._id)
            }
        }

        else {
            const response = await fetch(apiURL + `/bookmarks/${bookmarkId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            })


            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'DElETE_BOOKMARK', payload: json })
            }
        }
        setBookmarkLoading(false);
    }

    useEffect(() => {
        if (user && user.token) {
            fetch(apiURL + `/user/${props.tweet.author}/`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            }).then(value => {
                value.json().then(author => {
                    setAuthor(author.username);
                    setPhoto(author.profilePicture)
                })
            })
        }
    }, [])


    return (
        <div className={`tweet ${!showComments ? 'tweet-hover' : ''}`}>
            <div className="user_details">
                <Avatar picture={photo}/>
                <p className="username_bold">{author}</p>
                <p className="username">{author}</p>
            </div>
            <p className="content"> {props.tweet.content}
            </p>
            <div className="interactions">
                <div onClick={updateLikesHandler} disabled={likeLoading}><img src={isClicked ? liked : like} alt="like" /> </div> <p className={isClicked ? "updated" : ""}>{likesNumber}</p>
                <div onClick={showCommentsHandler}><img src={comment} alt="comment" /> </div> <p>{props.tweet.comments.length}</p>
                <div><img src={repost} alt="repost" /> </div> <p>{props.tweet.reposts.length}</p>
                <div onClick={bookmarkTweetHandler}><img src={isBookmarked ? bookmarked : bookmark} alt="repost" /> </div>
            </div>
            {showComments && <CommentForm setShowComments={setShowComments} tweetId={props.tweet._id} />}
            {showComments &&
                comments &&
                comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))
            }

        </div>
    );
};


export default Tweet;