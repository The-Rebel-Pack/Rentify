import React, { createContext, useState } from 'react'

export const ListingsContext = createContext();

const ListingsContextProvider = (props) => {
    const [listings, setListings] = useState(null);
    const [categories, setCategories] = useState(null);
    const [currentListings, setCurrentListings] = useState(null);

    const value = {
        listings,
        setListings,
        currentListings,
        setCurrentListings,
        categories,
        setCategories
    }

    return (
        <ListingsContext.Provider value={value}>
            {props.children}
        </ListingsContext.Provider>
    )
}

export default ListingsContextProvider
