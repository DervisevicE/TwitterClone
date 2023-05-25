import React, { useState, useEffect, useRef } from 'react';
import './FollowersFollowingList.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { apiURL } from '../../constants';
import Avatar from '../Avatar/Avatar';

const FollowersFollowingList = ({ setShowFollowersList, setShowFollowingList, selectedList }) => {
    const { user, dispatch } = useAuthContext();
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchFollowersAndFollowing = async () => {
            try {
                if (user && user.token) {
                    const response = await fetch(
                        apiURL + `/user/${selectedList === 'followers' ? 'followers' : 'following'}`,
                        {
                            headers: { 'Authorization': `Bearer ${user.token}` },
                        }
                    );
                    const data = await response.json();

                    if (response.ok) {
                        if (selectedList === 'followers') {
                            setFollowers(data);
                        } else {
                            setFollowing(data);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching followers and following:', error);
            }
        };

        fetchFollowersAndFollowing();
    }, [user, selectedList]);

    const openListRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openListRef.current && !openListRef.current.contains(event.target)) {
                setShowFollowersList(false);
                setShowFollowingList(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowFollowersList, setShowFollowingList]);

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
                setIsFollowing(true);
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
                setIsFollowing(false);
                dispatch({ type: 'UNFOLLOW_USER', payload: unfollowId });
                setIsFollowing(false);
            }
        } catch (error) {
            console.error('Error handling unfollow:', error);
        }
    };



    useEffect(() => {
        if (user && user.token) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(apiURL + '/user', {
                        headers: { 'Authorization': `Bearer ${user.token}` },
                    });
                    const data = await response.json();

                    if (response.ok) {
                        dispatch({ type: 'SET_USER', payload: data.user });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }
    }, [user, dispatch]);

    return (
        <div className='form_background'>
            <div className="followers_following_list" ref={openListRef}>
                {selectedList === 'followers' && (
                    <div className="followers">
                        <h3 className='list_heading'>Followers</h3>
                        {followers.map((follower) => (
                            <div key={follower._id} className="follower_item">
                                <div className="details">
                                    <Avatar picture={follower.profilePicture}/>
                                    <div className="names">
                                        <div className="name_bold">{follower.username}</div>
                                        <div className="name">{follower.username}</div>
                                    </div>
                                </div>
                                {!isFollowing ? (
                                    <button className='follow_btn' onClick={() => handleFollow(follower._id)}>Follow</button>
                                ) : (
                                    <button className='unfollow_btn' onClick={() => handleUnfollow(follower._id)}>Unfollow</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {selectedList === 'following' && (
                    <div className="following">
                        <h3 className='list_heading'>Following</h3>
                        {following.map((follow) => (
                            <div key={follow._id} className="following_item">
                                <div className="details">
                                    <Avatar picture={follow.profilePicture} />
                                    <div className="names">
                                        <div className="name_bold">{follow.username}</div>
                                        <div className="name">{follow.username}</div>
                                    </div>
                                </div>
                                <button className="unfollow_btn" onClick={() => handleUnfollow(follow._id)}>
                                    Unfollow
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FollowersFollowingList;