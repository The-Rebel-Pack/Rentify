import React, { useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';

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
            <h1>Listings</h1>
            {listings && listings.listings.map((item, idx) => (
                <h2 key={idx}>{item.title}</h2>
            ))}
        </div>
    )
}

export default Listings;
