import React from "react";
import './LeftBar.css'
import home from './home.png'
import explore from './explore.png'
import bell from './bell.png'
import bookmark from './bookmark.png'
import profile from './profile.png'

const LeftBar = () => {
    return(
        <div className="leftBar">
            
            <div className="item">
                <div className="icon"> <img src={home} alt="home"/></div>
                <div className="text"> Home</div>
            </div>

            <div className="item">
                <div className="icon"> <img src={explore} alt="explore"/></div>
                <div className="text"> Explore</div>
            </div>

            <div className="item">
                <div className="icon"> <img src={bell} alt="bell"/></div>
                <div className="text"> Notifications</div>
            </div>

            <div className="item">
                <div className="icon"> <img src={bookmark} alt="bookmark"/></div>
                <div className="text"> Bookmarks</div>
            </div>

            <div className="item">
                <div className="icon"> <img src={profile} alt="profile"/></div>
                <div className="text"> Profile</div>
            </div>

            <button className="tweetBtn">Tweet</button>
        </div>
    );
};


export default LeftBar;