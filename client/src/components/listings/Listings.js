import React, { useContext, } from 'react';
import { ListingsContext } from '../../contexts/ListingsContext';
import Listing from './Listing';
import ListingsTitle from './ListingsTitle';
import Categories from '../filter/Categories';
import './Listings.css';

const Listings = () => {
  const { listings } = useContext(ListingsContext);
  return (
    <section className='app__section listings-section'>
      <Categories />
      <ListingsTitle />
      {listings && listings.map((listing) => (
        <Listing key={listing.l_id} listing={listing} />
      ))}
    </section>
  );
};

export default Listings;
