import React, { createContext, useState } from 'react'

export const ListingsContext = createContext();

const ListingsContextProvider = (props) => {
    const [listings, setListings] = useState(null);
    const [currentListings, setCurrentListings] = useState(null);

    return (
        <ListingsContext.Provider value={{ listings, setListings, currentListings, setCurrentListings }}>
            {props.children}
        </ListingsContext.Provider>
    )
}

export default ListingsContextProvider
