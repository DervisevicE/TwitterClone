import React from "react";
import './Comment.css'
import Avatar from "../Avatar/Avatar";

const Comment = () => {
    return (
        <div className="comment">
            <Avatar />
            <div className="comment_content">
                <p>This is content of my comment. Bla bla bla bla bla.</p>
            </div>

        </div>
    );
}


export default Comment;