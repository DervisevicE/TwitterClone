import React from 'react';
import { useState, useEffect } from 'react';
import './ProfilePage.css'
import Avatar from '../../components/Avatar/Avatar';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { apiURL } from '../../constants';
import { useTweetsContext } from '../../hooks/useTweetsContext';
import Tweet from '../../components/Tweet/Tweet';
import Suggestion from '../../components/Suggestion/Suggestion';


const ProfilePage = () => {

    const [isEditing, setIsEditing] = useState(false);
    const { user, randomUsers, dispatch } = useAuthContext();
    const { tweets } = useTweetsContext();
    const [userTweets, setUserTweets] = useState([]);

    const createdAtDate = new Date(user.createdAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = createdAtDate.toLocaleDateString('en-US', options);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        const fetchRandomUsers = async () => {

            if (user && user.token) {
                const response = await fetch(apiURL + '/user/random', {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                })
                const json = await response.json()

                if (response.ok) {
                    dispatch({ type: 'RANDOM_USERS', payload: json })
                }
            }

        }

        const getUser = async () => {
            if (user && user.token) {
                const response = await fetch(apiURL + '/user/', {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                })
                const json = await response.json()

                if (response.ok) {
                    dispatch({ type: 'GET_USER', payload: json })
                }
            }
        }

        const fetchTweets = async () => {
            if (user && user.token) {
                fetch(apiURL + `/tweets/me`, {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                }).then(value => {
                    value.json().then(tweet => {
                        setUserTweets(tweet);
                    })
                })
            }
        };

        fetchRandomUsers()
        getUser()
        fetchTweets()
        console.log(userTweets)

    }, [user])

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
                {userTweets && userTweets.map((tweet) => (
                    <Tweet key={tweet._id} tweet={tweet} />
                ))}
            </div>
            <div className="suggestions">
                <h2 className='title'>Who to follow?</h2>
                {randomUsers && randomUsers.map(user => {
                    return <Suggestion key={user._id} user={user} />
                })}
            </div>

            {isEditing && <EditProfileForm setIsEditing={setIsEditing} />}
        </div>
    );
};

export default ProfilePage;
