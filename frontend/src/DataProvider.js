import React, { useState, createContext } from "react";
import dataJSON from './data.json';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState(dataJSON);


    const updateData = (newData) => {
        setData(newData);
    }

    fetch("http://localhost:8000/tweets").then(value => {
        value.json().then(tweets => {
            setData(tweets);
        })
    })

    return (
        <DataContext.Provider value={{ data, updateData }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider