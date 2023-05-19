import React from "react";
import './Comment.css'
import Avatar from "../Avatar/Avatar";

const Comment = (props) => {

    return (
        <div className="comment">
            <Avatar />
            <div className="comment_content">
                <p>{props.comment.content}t</p>
            </div>

        </div>
    );
}


export default Comment;