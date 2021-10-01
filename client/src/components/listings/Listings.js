import './Listings.css';
import React, { useContext } from 'react';
import { ListingsContext } from '../../contexts/ListingsContext';
import Listing from './Listing';
import ListingsTitle from './ListingsTitle';
import Categories from '../filter/Categories';
import Pagination from '../pagination/Pagination';

const Listings = () => {
  const { listings } = useContext(ListingsContext);
  const balanceGrid = listings && listings.length === 4 ? ' listings-section__grid--2x2' : '';
  const balanceGridOne = listings && listings.length === 1 ? ' listings-section__grid--1x1' : '';

  return (
    <section className='app__section listings-section'>
      <Categories />
      <ListingsTitle />
      <section className={`listings-section__grid${balanceGrid}${balanceGridOne}`}>
        {listings && listings.map((listing) => (
          <Listing key={listing.l_id} listing={listing} />
        ))}
      </section>
      <Pagination />
    </section>
  );
};

export default Listings;
