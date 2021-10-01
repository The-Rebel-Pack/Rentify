import React, { createContext, useState } from 'react';

export const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {
  const [query, setQuery] = useState({
    categories: [],
    search: '',
  });
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
