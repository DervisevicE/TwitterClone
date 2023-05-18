import React, { useState } from 'react';
import './NewPostPopup.css'
import Avatar from '../Avatar/Avatar';

const NewPostPopup = ({ setIsTweetAction }) => {
    const [content, setContent] = useState('');
    
    const handleContentChange = (e) => {
        e.target.preventDefault()
        setContent(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
     

        setContent('');
    };

    return (
        <div className='form_background'>
            <form className='new_post_popup' onSubmit={handleSubmit}>
                <div className="closeBtn">
                    <button onClick={() => { setIsTweetAction(false); }}> X </button>
                </div>
                <div className="avatar_container">
                    <Avatar />
                </div>
                <div className="content_container">
                    <input className='new_post_popup_text' placeholder='Test Test' type="text" value={content} onChange={handleContentChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
    
};

export default NewPostPopup;