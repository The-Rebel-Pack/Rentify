import React, { useContext, useState } from 'react';
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

    const balanceGrid = listings && listings.length === 4 ? ' listings-section__grid--2x2' : '';
    const balanceGridOne = listings && listings.length === 1 ? ' listings-section__grid--1x1' : '';

    const headingsContent = () => {
        let searchContent = ``;
        if (querySearch) {
            searchContent = querySearch.length > 1 ? ` for ${querySearch}` : '';
        }
        return `${searchContent}`;
    }

    return (
        <section className='app__section listings-section'>
            <Categories />
            {listings.length > 0
                ?
                <>
                    <Heading heading={`Found ${fullCount} results${headingsContent()}`} />
                    <section className={`listings-section__grid${balanceGrid}${balanceGridOne}`}>
                        {listings.map((listing) => (
                            <Listing key={listing.l_id} listing={listing} />
                        ))}
                    </section>
                    <Pagination />
                </>
                : <Heading heading={`Found no results${headingsContent()}, please try something else`} />
            }
        </section>
    )
}

export default Listings;
