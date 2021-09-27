import React, { useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import './style/Listings.css';
import { AuthContext } from '../../context/AuthContext';
import { ListingsContext } from '../../context/ListingsContext';
import Listing from './Listing';

const MyListings = () => {
    const { token } = useContext(AuthContext);
    const { myListings, setMyListings } = useContext(ListingsContext);

    const fetchData = useCallback(
        async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/listings/user`, {
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
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/listings/${id}`);
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/listings/user`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
        setMyListings(res.data.listings);
    }

    const handleDelete = (id) => {
        deleteListing(id);
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
