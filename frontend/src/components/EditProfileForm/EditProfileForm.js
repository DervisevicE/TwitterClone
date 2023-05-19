import React, { useState } from 'react';
import './EditProfileForm.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import { apiURL } from '../../constants';

const EditProfileForm = ({ setIsEditing }) => {

    const { user, dispatch } = useAuthContext();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

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
            body: JSON.stringify({ username: name, bio: bio })
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_USER', payload: {...json, token: user.token} })
        }

        setName('');
        setBio('');
        setIsEditing(false);
    };

    return (
        <div className='form_background'>
            <form className='edit_profile_form' onSubmit={handleSubmit}>
                <div className="closeBtn">
                    <button onClick={() => { setIsEditing(false); }}> X </button>
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