import React, { useEffect, useCallback, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';
import { AuthContext } from '../../context/AuthContext';
import Categories from './Categories';
import './style/Listings.css';

const Listings = () => {
    const { auth } = useContext(AuthContext)
    const { listings, setListings, categories } = useContext(ListingsContext);

    const fetchData = useCallback(
        async () => {
            const res = await axios.get('http://localhost:5000/api/listings');
            setListings(res.data);
        },
        [setListings],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <section className='app__section listings-section'>
            <Categories />
            <section className='listings-section__grid'>
                {listings
                    ?
                    listings.map(listing => (
                        <div key={listing.l_id} >
                            <h2>{listing.title}</h2>
                            <p>{listing?.price?.day} kr</p>
                            <p>{listing.category}</p>
                            <img src={listing?.details?.images[0]} alt={listing.title} width="150px" />
                            <Link to={`/listings/${listing.l_id}`} ><button className='button'>Details</button></Link>
                        </div>
                    ))
                    : <h2>No results, please search for something else</h2>
                }
            </section>
        </section>
    )
}

export default Listings;
