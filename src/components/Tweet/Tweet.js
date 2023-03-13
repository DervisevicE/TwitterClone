import React from "react";
import Avatar from "../Avatar/Avatar";
import './Tweet.css'


const Tweet = () => {
    return (
        <div className="tweet">
            <div className="user_details">
                <Avatar />
                <p className="username_bold">Username Lastaname</p>
                <p className="username">@username.test</p>
            </div>
            <p className="content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vel est venenatis, posuere libero eget, commodo sapien.
                Vestibulum pretium nulla at quam facilisis, id dignissim nibh ultricies.
                Nam ut ex vitae massa porttitor faucibus nec quis odio.
                Vivamus egestas aliquam eros ac varius. Sed eu interdum purus, ac iaculis arcu.
                Nulla feugiat ante at massa iaculis blandit. Nunc commodo purus viverra tellus
                laoreet, eget gravida urna blandit. Sed vitae justo pellentesque, bibendum
                libero vitae, ultricies arcu. Integer maximus risus ac odio scelerisque, non
                aliquet felis venenatis.
            </p>
        </div>
    );
};


export default Tweet;