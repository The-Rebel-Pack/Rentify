import React, { useEffect, useCallback, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';
import Search from './Search';
import { AuthContext } from '../../context/AuthContext';
import Categories from './Categories';

const Listings = () => {
    const { auth } = useContext(AuthContext)
    const { listings, setListings } = useContext(ListingsContext);

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
        <div>
            {auth && <>
                <p><Link to={`/listings/create`} ><button>Create new listing</button></Link></p></>}
            <Search />
            <Categories />
            {listings && listings.map(listing => (
                <div key={listing.id} >
                    <h2>{listing.name}</h2>
                    <p>{listing?.price?.day} kr</p>
                    <img src={listing?.details?.images[0]} alt={listing.name} width="150px" />
                    <Link to={`/listings/${listing.id}`} ><button>Details</button></Link>
                </div>
            ))}
        </div>
    )
}

export default Listings;
