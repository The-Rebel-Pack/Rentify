import React, { useContext } from 'react';
import { ListingsContext } from '../../context/ListingsContext';
import { QueryContext } from '../../context/QueryContext';
import Categories from './Categories';
import Heading from './Heading';
import Listing from './Listing';
import Pagination from './Pagination';
import './style/Listings.css';

const Listings = () => {
    const { listings } = useContext(ListingsContext);
    const { fullCount, querySearch } = useContext(QueryContext);

    return (
        <section className='app__section listings-section'>
            <Categories />
            {listings.length > 0
                ?
                <>
                    <Heading heading={`Found ${fullCount} results${querySearch && ' for '}${querySearch}`} />
                    <section className='listings-section__grid'>
                        {listings.map((listing) => (
                            <Listing key={listing.l_id} listing={listing} />
                        ))}
                    </section>
                    <Pagination />
                </>
                : <Heading heading={`Found no results${querySearch && ' for '}${querySearch}, please try something else`} />
            }
        </section>
    )
}

export default Listings;
