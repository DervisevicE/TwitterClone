import React from 'react';
import { useState } from 'react';
import './ProfilePage.css'
import Avatar from '../../components/Avatar/Avatar';
import Notification from '../../components/Notification/Notification';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';


const ProfilePage = () => {

    const [isEditing, setIsEditing] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    return (
        <div className='profile_page'>
            <div className="title"><h2>USERNAME</h2></div>

            <div className='header'>
                <div className="profile_info">
                    <Avatar />
                    <div className="user_names">
                        <div className="name_bold">Test Tes</div>
                        <div className="name">Test Test</div>
                    </div>
                    <p className="created_at">Joined in January 2023</p>
                </div>
                <button className="edit_profile_btn" onClick={handleEditProfile}>Edit Profile</button>
            </div>
            <div className="follow_counts">
                <p>
                    <span className="follow_count">567</span> Following
                </p>
                <p>
                    <span className="follow_count">1234</span> Followers
                </p>
            </div>
            <div className="tweets">
                <Notification />
                <Notification />
            </div>
            <div className="suggestions">
                <h2 className='title'>Who to follow?</h2>
                <Notification />
                <Notification />
                {/* Add more suggestions here */}
            </div>

            {isEditing && <EditProfileForm setIsEditing={setIsEditing} />}
        </div>
    );
};

export default ProfilePage;
