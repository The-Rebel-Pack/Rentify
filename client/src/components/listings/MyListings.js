import React, { useEffect, useCallback, useContext, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import './style/Listings.css';
import { AuthContext } from '../../context/AuthContext';
import { ListingsContext } from '../../context/ListingsContext';
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
    }, [token, fetchData, myListings]);

    const deleteListing = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/listings/${id}`);
        setMyListings(res.data);
    }

    const handleDelete = (id) => {
        deleteListing(id);
        history.push('/listings/my-listings')
    }

    return (
        <section className='app__section listings-section'>
            <section className='listings-section__grid'>
                {myListings.length > 0
                    ?
                    myListings.map(listing => (
                        <div key={listing.l_id} >
                            <h2>{listing.title}</h2>
                            <p>{listing?.price?.day} kr</p>
                            <p>{listing.category}</p>
                            {listing?.details?.images.length > 0 &&
                                <img src={listing?.details?.images[0]} alt={listing.title} width="150px" />
                            }
                            <button className='button' onClick={() => handleDelete(listing.l_id)} >Delete</button>
                            <Link to={`/listings/edit/${listing.l_id}`} ><button className='button'>Edit</button></Link>
                        </div>
                    ))
                    : <h2>You have no listings.</h2>
                }
            </section>
        </section>
    )
}

export default MyListings;
