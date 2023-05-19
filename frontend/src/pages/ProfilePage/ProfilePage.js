import React from 'react';
import { useState } from 'react';
import './ProfilePage.css'
import Avatar from '../../components/Avatar/Avatar';
import Notification from '../../components/Notification/Notification';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { apiURL } from '../../constants';
import { useTweetsContext } from '../../hooks/useTweetsContext';
import Tweet from '../../components/Tweet/Tweet';


const ProfilePage = () => {

    const [isEditing, setIsEditing] = useState(false);
    const { user, dispatch } = useAuthContext();
    const { tweets } = useTweetsContext();


    const createdAtDate = new Date(user.createdAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = createdAtDate.toLocaleDateString('en-US', options);

    const fetchTweets = async () => {
        const response = await fetch(apiURL + '/tweets', {
            headers: { 'Authorization': `Bearer ${user.token}` },
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_TWEETS', payload: json })
        }
    }

    if (user) {
        fetchTweets()
    }

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    return (
        <div className='profile_page fade-in'>
            <div className="title"><h2></h2></div>

            <div className='header'>
                <div className="profile_info">
                    <Avatar />
                    <div className="user_names">
                        <div className="name_bold">{user.username}</div>
                        <div className="name">{user.username}</div>
                    </div>
                    <p className="created_at">{formattedDate}</p>
                </div>
                <button className="edit_profile_btn" onClick={handleEditProfile}>Edit Profile</button>
            </div>
            <div className="follow_counts">
                <p>
                    <span className="follow_count">{user.following?.length ?? 0}</span> Following
                </p>
                <p>
                    <span className="follow_count">{user.followers?.length ?? 0}</span> Followers
                </p>
            </div>
            <div className="tweets">
                {tweets && tweets.map((tweet) => (
                    <Tweet key={tweet._id} tweet={tweet} />
                ))}
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
