import React, { useState, useEffect, useRef } from 'react';
import './EditProfileForm.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import { apiURL } from '../../constants';
import FileBase from 'react-file-base64';

const EditProfileForm = ({ setIsEditing }) => {

    const { user, dispatch } = useAuthContext();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(apiURL + '/user', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: name, bio: bio, profilePicture: photo })
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_USER', payload: {...json, token: user.token} })
        }

        setName('');
        setBio('');
        setPhoto('');
        setIsEditing(false);
    };
    let editProfileRef = useRef();
    useEffect(() => {
        let handler = (event) => {
            if (!editProfileRef.current.contains(event.target)) {
                setIsEditing(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <div className='form_background transition'>
            <form className='edit_profile_form' onSubmit={handleSubmit} ref={editProfileRef}>
                <div className="closeBtn">
                    <button onClick={() => { setIsEditing(false); }}> X </button>
                </div>
                <div>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPhoto(base64)}  />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input placeholder='Test Test' type="text" id="name" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" value={user.bio} onChange={handleBioChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>

    );
};

export default EditProfileForm;