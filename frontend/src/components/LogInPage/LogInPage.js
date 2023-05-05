import React from "react";
import './LogInPage.css'
import icon from '../../assets/twitterIcon.png';


const LogInPage = () => {
    return (
        <div className="login_page">
            <div>
                <img src={icon} />
                <p>Welcome Back</p>
            </div>
            <form className="login_form">
                <input type="text" name="text" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Log in" />
            </form>
        </div>
    )
}


export default LogInPage;