import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ListingsContext } from '../../context/ListingsContext';
import Categories from './Categories';
import Pagination from './Pagination';
import './style/Listings.css';

const Listings = () => {
    const { listings } = useContext(ListingsContext);

    return (
        <section className='app__section listings-section'>
            <Categories />
            <section className='listings-section__grid'>
                {listings.length > 0
                    ?
                    <>
                        {listings.map(listing => (
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
                                    <div className='listings__image-container'
                                        style={{
                                            backgroundImage: `url("${listing?.details?.images[0]}")`
                                        }}></div>
                                </Link>
                                <Link to={`/listings/${listing.l_id}`} >
                                    <div className='listings__details-container'>
                                        <h2 className='listings__details-title'>{listing.title}<span className='listings__details-category'>
                                            <span className='categories__label'>
                                                {listing.category}
                                            </span>
                                        </span></h2>
                                        <span className='listings__details-price'>{listing?.price?.day} kr/day</span>

                                    </div>
                                </Link>
                            </div>
                        ))}
                        <Pagination />
                    </>
                    : <h2>No results, please search for something else</h2>
                }
            </section>
        </section>
    )
}

export default Listings;
