import React, { useContext } from 'react';
import { ListingsContext } from '../../context/ListingsContext';
import Categories from './Categories';
import Listing from './Listing';
import Pagination from './Pagination';
import './style/Listings.css';

const Listings = () => {
    const { listings } = useContext(ListingsContext);

    return (
        <section className='app__section listings-section'>
            <Categories />
            {listings.length > 0
                ?
                <>
                    <section className='listings-section__grid'>
                        {listings.map((listing) => (
                            <Listing key={listing.l_id} listing={listing} />
                        ))}
                    </section>
                    <Pagination />
                </>
                : <h2>No results, please search for something else</h2>
            }
        </section>
    )
}

export default Listings;
