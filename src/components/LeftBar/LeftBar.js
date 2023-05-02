import React from "react";
import { Link } from "react-router-dom";
import './LeftBar.css'
import home from '../../assets/home.png'
import explore from '../../assets/explore.png'
import bell from '../../assets/bell.png'
import bookmark from '../../assets/bookmark.png'
import profile from '../../assets/profile.png'
import twitterIcon from '../../assets/twitterIcon.png'

const LeftBar = () => {
    return (
        <div className="left_bar">
            <Link className="router_links" to='/'>
                <div className="item twitter">
                    <div className="icon twitter_logo"> <img src={twitterIcon} alt="icon" /> </div>
                </div>
            </Link>

            <Link className="router_links" to='/'>
                <div className="item">
                    <div className="icon"> <img src={home} alt="home" /></div>
                    <div className="text"> Home </div>
                </div>
            </Link>

            <Link className="router_links" to='explore'>
                <div className="item">
                    <div className="icon"> <img src={explore} alt="explore" /></div>
                    <div className="text">Explore </div>
                </div>
            </Link>

            <Link className="router_links" to='notifications'>
                <div className="item">
                    <div className="icon"> <img src={bell} alt="bell" /></div>
                    <div className="text">Notifications</div>
                </div>
            </Link>

            <Link className="router_links" to='bookmarks'>
                <div className="item">
                    <div className="icon"> <img src={bookmark} alt="bookmark" /></div>
                    <div className="text">Bookmarks </div>
                </div>
            </Link>

            <Link className="router_links" to='profile'>
                <div className="item">
                    <div className="icon"> <img src={profile} alt="profile" /></div>
                    <div className="text">Profile </div>
                </div>
            </Link>

            <button className="tweetBtn">Tweet</button>
        </div >
    );
};


export default LeftBar;