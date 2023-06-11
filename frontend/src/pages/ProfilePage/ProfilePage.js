import React from 'react';
import { useState, useEffect } from 'react';
import './ProfilePage.css'
import Avatar from '../../components/Avatar/Avatar';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { apiURL } from '../../constants';
import Tweet from '../../components/Tweet/Tweet';
import Suggestion from '../../components/Suggestion/Suggestion';
import FollowersFollowingList from '../../components/FollowersFollowingList/FollowersFollowingList'
import { useParams } from 'react-router-dom';


const ProfilePage = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [showFollowingList, setShowFollowingList] = useState(false)
    const [showFollowersList, setShowFollowersList] = useState(false)
    const [selectedList, setSelectedList] = useState(null);
    const { user, randomUsers, dispatch } = useAuthContext();
    const [userTweets, setUserTweets] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [loggedInUserDetails, setLoggedInUserDetails] = useState(null);
    const [following, setFollowing] = useState([]);

    const { userId } = useParams();


    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = userDetails && userDetails.createdAt ? new Date(userDetails.createdAt).toLocaleDateString('en-US', options) : '';



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

        const getUserById = async () => {
            if (userId && user && user.token) {
                fetch(apiURL + `/user/${userId}/`, {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                }).then(value => {
                    value.json().then(author => {
                        setUserDetails(author);
                    })
                })
            }
        }

        const fetchTweetsByAuthor = async () => {
            if (userId && user && user.token) {
                const response = await fetch(apiURL + `/tweets?authorId=${userId}`, {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                });
                const json = await response.json();

                if (response.ok) {
                    if (json.length === 0) {
                        setUserTweets([]);
                    } else {
                        setUserTweets(json);
                    }
                }
            }
        }

        const getUserDetails = async () => {
            if (user && user.token) {
                const response = await fetch(apiURL + '/user/', {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                })
                const json = await response.json()

                if (response.ok) {
                    setLoggedInUserDetails(json)
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
                    setUserDetails(json)
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
        getUserDetails()
        if (!userId) {
            getUser()
            fetchTweets()
        } else {
            getUserById()
            fetchTweetsByAuthor()
        }



    }, [user, userId])

    useEffect(() => {

        const fetchFollowing = async () => {
            if (user && user.token) {
                const response = await fetch(apiURL + `/user/following`, {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                })
                const json = await response.json()

                if (response.ok) {
                    setFollowing(json)
                }
            }
        }

        fetchFollowing()
    }, [user])




    const openFollowingList = async () => {
        setSelectedList('following');
        setShowFollowingList(true)
    }

    const openFollowersList = async () => {
        setSelectedList('followers');
        setShowFollowersList(true)
    }

    const handleFollow = async (followId) => {
        try {
            const response = await fetch(apiURL + `/user/${followId}/follow`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();

            if (response.ok) {
                setFollowing(prevFollowing => [...prevFollowing, followId]);
                dispatch({ type: 'FOLLOW_USER', payload: followId });
            }
        } catch (error) {
            console.error('Error handling follow:', error);
        }
    };

    const handleUnfollow = async (unfollowId) => {
        try {
            const response = await fetch(apiURL + `/user/${unfollowId}/unfollow`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();

            if (response.ok) {
                setFollowing(prevFollowing => prevFollowing.filter(follow => follow !== unfollowId));
                dispatch({ type: 'UNFOLLOW_USER', payload: unfollowId });
            }
        } catch (error) {
            console.error('Error handling unfollow:', error);
        }
    };



    const isUserFollowing = loggedInUserDetails?.following.includes(userId)

    return (
        <div className='profile_page fade-in'>
            <div className="title"><h2></h2></div>

            <div className='header'>
                <div className="profile_info">
                    <Avatar picture={userDetails ? userDetails.profilePicture : ''} />
                    <div className="user_names">
                        <div className="name_bold">{userDetails ? userDetails.username : ''}</div>
                        <div className="name">{userDetails ? userDetails.username : ''}</div>
                    </div>
                    <p className="created_at">{formattedDate}</p>
                </div>
                {userDetails && userDetails._id === loggedInUserDetails._id && (<button className="edit_profile_btn" onClick={handleEditProfile}>Edit Profile</button>)}


                {userDetails && userDetails._id !== loggedInUserDetails._id && (
                    <>
                        {isUserFollowing ? (
                            <button className='unfollow_btn' onClick={() => handleUnfollow(userId)}>Unfollow</button>
                        ) : (
                            <button className='follow_btn' onClick={() => handleFollow(userId)}>Follow</button>
                        )}
                    </>
                )}


            </div>
            <div className="follow_counts">
                <p onClick={openFollowingList}>
                    <span className="follow_count">{userDetails ? userDetails.following.length : 0}</span> Following
                </p>
                <p onClick={openFollowersList}>
                    <span className="follow_count">{userDetails ? userDetails.followers.length : 0}</span> Followers
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
            {showFollowersList && <FollowersFollowingList setShowFollowersList={setShowFollowersList}
                setShowFollowingList={setShowFollowingList}
                selectedList={selectedList} />}
            {showFollowingList && <FollowersFollowingList setShowFollowersList={setShowFollowersList}
                setShowFollowingList={setShowFollowingList}
                selectedList={selectedList} />}
        </div>
    );
};

export default ProfilePage;
