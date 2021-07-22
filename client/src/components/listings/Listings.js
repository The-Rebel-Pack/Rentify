import React, { useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';
import Search from './Search';

const Listings = () => {
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
            <Search />
            {listings && listings.map(listing => (
                <div key={listing.id} >
                    <h2>{listing.name}</h2>
                    <p>50 kr</p>
                    <img src={listing?.details?.images[0]} alt={listing.name} width="100px" />
                    <a href= {`/listings/${listing.id}`} ><button>Details</button></a>
                </div>
            ))}
        </div>
    )
}

export default Listings;
