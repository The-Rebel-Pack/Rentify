import React, { useEffect, useCallback, useContext, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import './style/Listings.css';
import { AuthContext } from '../../context/AuthContext';
import { ListingsContext } from '../../context/ListingsContext';
import Listing from './Listing';

const MyListings = () => {
    const { token } = useContext(AuthContext);
    const { myListings, setMyListings } = useContext(ListingsContext);

    const history = useHistory();

    const fetchData = useCallback(
        async () => {
            const res = await axios.get('http://localhost:5000/api/listings/user', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setMyListings(res.data.listings);
        },
        [setMyListings, token],
    );

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token, fetchData]);

    const deleteListing = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/listings/${id}`);
        setMyListings(res.data);
    }

    const handleDelete = (id) => {
        deleteListing(id);
        history.push('/listings/my-listings')
    }

    return (
        myListings.length > 0
            ?
            <section className='listings-section__grid'>
                {myListings.map(listing => (
                    <Listing key={listing.l_id} listing={listing} handleDelete={handleDelete} />
                ))}
            </section>
            : <p className='listing__meta-details'>You have no active listings.</p>
    )
}

export default MyListings;
