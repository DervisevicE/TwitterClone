import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import './CommentForm.css'
import { useCommentsContext } from "../../hooks/useCommentsContext";
import { apiURL } from "../../constants";
import { useAuthContext } from "../../hooks/useAuthContext";


const CommentForm = (props) => {

    const [comment, setComment] = useState('')
    const { commentsDispatch } = useCommentsContext()
    const { user } = useAuthContext()
    const { tweetId } = props


    const handleSubmit = async (e) => {

        e.preventDefault()

        const response = await fetch(apiURL + '/comments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: comment, tweet: tweetId })
        })

        const json = await response.json()

        if (response.ok) {
            commentsDispatch({ type: 'CREATE_COMMENT', payload: json })
        }

        setComment("");

    }

    return (
        <form className='comment_form' onSubmit={handleSubmit}>
            <div className="avatar_container">
                <Avatar />
            </div>
            <div className="comment_container">
                <input className='comment_text' placeholder='Tweet your reply!' type="text" value={comment} onChange={(e) => {setComment(e.target.value)}} />
            </div>
            <button type="submit">Reply</button>
        </form>
    )
}

export default CommentForm