import React from "react";
import './RightBar.css'
import search from './search.png'



const RightBar = () => {
    return (
        <div className="right_bar">
            <div className="search_bar">
                <img src={search} alt="searchIcon" />
                <input className="search_fld" type="text" name="name" placeholder="Search Twitter"></input>
            </div>
        </div>
    );
}

export default RightBar;