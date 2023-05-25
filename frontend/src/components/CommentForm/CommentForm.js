import React, { useState, useEffect, useRef } from "react";
import Avatar from "../Avatar/Avatar";
import './CommentForm.css'
import { useCommentsContext } from "../../hooks/useCommentsContext";
import { apiURL } from "../../constants";
import { useAuthContext } from "../../hooks/useAuthContext";


const CommentForm = (props) => {

    const [comment, setComment] = useState('')
    const { commentsDispatch } = useCommentsContext()
    const { user } = useAuthContext()
    const [userDetails, setUserDetails] = useState(null)


    const handleSubmit = async (e) => {

        e.preventDefault()

        const response = await fetch(apiURL + '/comments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: comment, tweet: props.tweetId })
        })

        const json = await response.json()

        if (response.ok) {
            commentsDispatch({ type: 'CREATE_COMMENT', payload: json })
        }

        setComment("");
        props.setShowComments(false)

    }

    let commentFormRef = useRef()
    useEffect(() => {
        let handler = (event) => {
            if (!commentFormRef.current.contains(event.target)) {
                props.setShowComments(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    useEffect(() => {
        const getUser = async () => {
            if (user && user.token) {
                const response = await fetch(apiURL + '/user/', {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                })
                const json = await response.json()

                if (response.ok) {
                    setUserDetails(json)
                }
            }
        }

        getUser()
    }, [user])

    return (
        <form className='comment_form' ref={commentFormRef} onSubmit={handleSubmit}>
            <div className="avatar_container">
                <Avatar picture={userDetails ? userDetails.profilePicture: ''}/>
            </div>
            <div className="comment_container">
                <input className='comment_text' placeholder='Tweet your reply!' type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} />
            </div>
            <button type="submit">Reply</button>
        </form>
    )
}

export default CommentForm