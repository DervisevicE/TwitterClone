import React, { useState, createContext } from "react";
import { apiURL } from "./constants";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const updateData = (newData) => {
        setData(newData);
    }

    const user = localStorage.getItem('user');
    if (user && user.token) {
        fetch(apiURL + "/tweets", {
            headers: {
                'Authorization': 'Bearer ' + user.token,
            }
        }).then(value => {
            value.json().then(tweets => {
                setData(tweets);
            })
        })
    }

    return (
        <DataContext.Provider value={{ data, updateData }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider