import React, { createContext, useState } from 'react';

export const ListingsContext = createContext();

const ListingsContextProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  return (
    <ListingsContext.Provider value={{ listings, setListings }}>
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsContextProvider;
