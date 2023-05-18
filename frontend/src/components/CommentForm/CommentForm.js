import React, {useState} from "react";
import Avatar from "../Avatar/Avatar";
import './CommentForm.css'
const CommentForm = () => {

    const[comment, setComment] = useState('')

    const handleCommentChange = (e) => {
        e.target.preventDefault()
        setComment(e.target.value)
    }

    const handleSubmit = () => {

    }

    return(
        <form className='comment_form' onSubmit={handleSubmit}>
        <div className="avatar_container">
            <Avatar />
        </div>
        <div className="comment_container">
            <input className='comment_text' placeholder='Tweet your reply!' type="text" value={comment} onChange={handleCommentChange} />
        </div>
        <button type="submit">Reply</button>
    </form>
    )
}

export default CommentForm