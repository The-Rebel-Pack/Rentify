import React, { useEffect, useCallback, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';
import Search from './Search';
import { AuthContext } from '../../context/AuthContext';

const Listings = () => {
    const { auth } = useContext(AuthContext)
    const { listings, setListings } = useContext(ListingsContext);
    const { categories, setCategories } = useContext(ListingsContext);

    const fetchData = useCallback(
        async () => {
            const res = await axios.get('http://localhost:5000/api/listings');
            const resCat = await axios.get('http://localhost:5000/api/listings/categories');
            setListings(res.data);
            console.log(resCat.data);
            setCategories(resCat.data);
        },
        [setListings, setCategories],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            {auth && <>
                <p><Link to={`/listings/create`} ><button>Create new listing</button></Link></p></>}
            <Search />
            {categories && <>
                <ul>
                    {categories.map(a =>
                        <li key={a.id}><Link to={`/listings/categories/${a.id}`}>
                            {a.name}
                        </Link></li>
                    )}
                </ul></>}

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
