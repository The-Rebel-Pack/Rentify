import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ListingsContext } from '../../context/ListingsContext';
import Categories from './Categories';
import './style/Listings.css';

const Listings = () => {
    const { listings } = useContext(ListingsContext);

    return (
        <section className='app__section listings-section'>
            <Categories />
            <section className='listings-section__grid'>
                {listings.length > 0
                    ?
                    listings.map(listing => (
                            <div key={listing.l_id} className='listing'>
                                {listing?.details?.images.length > 0 &&
                                    <Link to={`/listings/${listing.l_id}`} >
                                        <div className='listing__image-container'
                                            style={{
                                                backgroundImage: `url("${listing?.details?.images[0]}")`
                                            }}></div>
                                    </Link>
                                }
                                <Link to={`/listings/${listing.l_id}`} >
                                    <div className='listing__details-container'>
                                        <h2>{listing.title}</h2>
                                        <p>{listing?.price?.day} kr/day</p>
                                        <p>{listing.category}</p>
                                    </div>
                                </Link>
                            </div>
                    ))
                    : <h2>No results, please search for something else</h2>
                }
            </section>
        </section>
    )
}

export default Listings;
