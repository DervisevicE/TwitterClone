import React, { useState, useEffect, useRef } from 'react';
import './NewPostPopup.css'
import Avatar from '../Avatar/Avatar';
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTweetsContext } from "../../hooks/useTweetsContext";


const NewPostPopup = ({ setIsTweetAction }) => {
    const [content, setContent] = useState('');
    const { dispatch } = useTweetsContext();
    const { user } = useAuthContext();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(apiURL + '/tweets', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content })
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'CREATE_TWEET', payload: json })
        }

        setContent("");
        setIsTweetAction(false);
    }

    let newPostRef = useRef();
    useEffect(() => {
        let handler = (event) => {
            if (!newPostRef.current.contains(event.target)) {
                setIsTweetAction(false);
            }
        };
        document.addEventListener("mousedown", handler);
        
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    

    return (
        <div className='form_background'>
            <form className='new_post_popup transition' onSubmit={handleSubmit} ref={newPostRef}>
                <div className="closeBtn">
                    <button onClick={() => { setIsTweetAction(false); }}> X </button>
                </div>
                <div className="avatar_container">
                    <Avatar />
                </div>
                <div className="content_container">
                    <input className='new_post_popup_text' placeholder='Test Test' type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
    
};

export default NewPostPopup;