import React, { useState } from 'react';
import './EditProfileForm.css'

const EditProfileForm = ({ setIsEditing }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Name:', name);
        console.log('Bio:', bio);
        // Reset input fields
        setName('');
        setBio('');
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
                    <textarea id="bio" value={bio} onChange={handleBioChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>

    );
};

export default EditProfileForm;