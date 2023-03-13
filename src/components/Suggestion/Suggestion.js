import React from "react";
import Avatar from "../Avatar/Avatar";
import './Suggestion.css';


const Suggestion = () => {
    return (
        <div class="suggestion">
            <div class="details">
                <Avatar />
                <div class="container">
                    <div class="names">
                        <div class="name_bold">FirstName LastName</div>
                        <div class="name">@firstname.lastname</div>
                    </div>
                    <button class="follow_btn">Follow</button>
                </div>
            </div>
        </div>

    );
}

export default Suggestion;