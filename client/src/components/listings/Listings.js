import React, { useContext, } from 'react';
import { ListingsContext } from '../../contexts/ListingsContext';

export const Listings = () => {
  const { listings } = useContext(ListingsContext);
return <div>Show listings asdas asd
    {listings && listings.map((listing) => listing.l_id)}
  </div>;
};
