import React from "react";
import Suggestion from "../Suggestion/Suggestion";
import './RightBar.css'
import search from '../../assets/search.png'



const RightBar = (props) => {
    return (
        <div className="right_bar">
            <div className="search_bar">
                <img src={search} alt="searchIcon" />
                <input className="search_fld" type="text" name="name" placeholder="Search Twitter"></input>
            </div>

            <div className="suggestions_list">
                <h2>Who to follow?</h2>
                {props.tweets.map((tweet) => (
                    <Suggestion key={tweet.id} tweet={tweet} />
                ))}
            </div>

        </div>
    );
}

export default RightBar;