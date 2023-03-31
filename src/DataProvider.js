import React, { useState, createContext } from "react";
import dataJSON from './data.json';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState(dataJSON);


    const updateData = (newData) => {
        setData(newData);
    }

    return (
        <DataContext.Provider value={{ data, updateData }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider