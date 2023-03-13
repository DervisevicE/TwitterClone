import React from "react";
import Avatar from "../Avatar/Avatar";
import Suggestion from "../Suggestion/Suggestion";
import './RightBar.css'
import search from './search.png'



const RightBar = () => {
    return (
        <div className="right_bar">
            <div className="search_bar">
                <img src={search} alt="searchIcon" />
                <input className="search_fld" type="text" name="name" placeholder="Search Twitter"></input>
            </div>

            <div className="suggestions_list">
                <h2>Who to follow?</h2>
                <Suggestion />
                <Suggestion />
                <Suggestion />
            </div>

        </div>
    );
}

export default RightBar;