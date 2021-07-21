import React, { createContext, useState } from 'react'

export const ListingsContext = createContext();

const ListingsContextProvider = (props) => {
    const [listings, setListings] = useState(null);

    return (
        <ListingsContext.Provider value={{listings, setListings}}>
            {props.children}
        </ListingsContext.Provider>
    )
}

export default ListingsContextProvider
