import React, {useState, useEffect} from "react";
import './Comment.css'
import Avatar from "../Avatar/Avatar";
import {apiURL} from "../../constants";
import {useAuthContext} from "../../hooks/useAuthContext";

const Comment = (props) => {

    const [photo, setPhoto] = useState('')
    const {user} = useAuthContext()
    console.log(props.comment.author)

    useEffect(() => {
        if (user && user.token) {
            fetch(apiURL + `/user/${props.comment.author}/`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            }).then(value => {
                value.json().then(author => {
                    setPhoto(author.profilePicture)
                })
            })
        }
    }, [])

    return (
        <div className="comment">
            <Avatar picture={photo}/>
            <div className="comment_content">
                <p>{props.comment.content}t</p>
            </div>

        </div>
    );
}


export default Comment;