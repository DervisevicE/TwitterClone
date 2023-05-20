import React, { useEffect } from "react";
import Suggestion from "../Suggestion/Suggestion";
import './RightBar.css'
import search from '../../assets/search.png'
import { apiURL } from "../../constants";
import { useAuthContext } from '../../hooks/useAuthContext';


const RightBar = () => {

    const { user, randomUsers, dispatch } = useAuthContext();

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


        fetchRandomUsers()

    }, [user])


    return (
        <div className="right_bar">
            <div className="search_bar">
                <img src={search} alt="searchIcon" />
                <input className="search_fld" type="text" name="name" placeholder="Search Twitter"></input>
            </div>

            <div className="suggestions_list">
                <h2>Who to follow?</h2>

                {randomUsers && randomUsers.map(user => {
                    return <Suggestion key={user._id} user={user} />
                })}

            </div>

        </div>
    );
}

export default RightBar;