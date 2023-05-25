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

    const [userDetails, setUserDetails] = useState(null);


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
        <div className='form_background'>
            <form className='new_post_popup transition' onSubmit={handleSubmit} ref={newPostRef}>
                <div className="closeBtn">
                    <button onClick={() => { setIsTweetAction(false); }}> X </button>
                </div>
                <div className="avatar_container">
                    <Avatar picture={userDetails ? userDetails.profilePicture : ''}/>
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