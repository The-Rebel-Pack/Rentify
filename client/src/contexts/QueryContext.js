import React, { createContext, useState } from 'react';
import { useLocation } from "react-router-dom";
import queryStringToObject from '../utils/queryStringToObject';

export const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {
  let location = useLocation();
  let locationObject = {};
  if (location.search) {
    locationObject = queryStringToObject(location.search);
    locationObject = Object.entries(locationObject).reduce((a, [k, v]) => (v && v.length > 0 ? (a[k] = v, a) : a), {});
    if (locationObject.categories) {
      locationObject.categories = locationObject.categories.split(',');
      locationObject.categories = locationObject.categories.map(num => Number(num));
    }
  }

  const [query, setQuery] = useState({
    categories: locationObject?.categories ? locationObject.categories : [],
    search: locationObject?.search ? locationObject.search : '',
    page: locationObject?.page ? locationObject.page : 1,
  });

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
