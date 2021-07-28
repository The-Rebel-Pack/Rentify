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
            myListings.map((listing, idx) => (
                <Listing key={idx} listing={listing} handleDelete={handleDelete}/>
            ))
            : <h2>You have no listings.</h2>
    )
}

export default MyListings;
