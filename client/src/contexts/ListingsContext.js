import React, { createContext, useState } from 'react';

export const ListingsContext = createContext();

const ListingsContextProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [listingStats, setListingStats] = useState({});
  const [categories, setCategories] = useState([]);
  return (
    <ListingsContext.Provider value={{ listings, setListings, listingStats, setListingStats, categories, setCategories }}>
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsContextProvider;
