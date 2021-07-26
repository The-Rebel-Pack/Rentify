import React, { useEffect, useCallback, useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import './style/Listings.css';
import { AuthContext } from '../../context/AuthContext';
import { ListingsContext } from '../../context/ListingsContext';

const MyListings = () => {
    const { auth, token } = useContext(AuthContext);
    const { myListings, setMyListings } = useContext(ListingsContext);

    const fetchData = useCallback(
        async () => {
            const res = await axios.get('http://localhost:5000/api/listings/user', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            console.log(res.data)
            setMyListings(res.data);
        },
        [setMyListings],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <section className='app__section listings-section'>
            <section className='listings-section__grid'>
                {myListings
                    ?
                    myListings.map(listing => (
                        <div key={listing.l_id} >
                            <h2>{listing.title}</h2>
                            <p>{listing?.price?.day} kr</p>
                            <p>{listing.category}</p>
                            {listing?.details?.images.length > 0 &&
                                <img src={listing?.details?.images[0]} alt={listing.title} width="150px" />
                            }
                            <Link to={`/listings/edit/${listing.l_id}`} ><button className='button'>Edit</button></Link>
                            <Link to={`/listings/delete/${listing.l_id}`} ><button className='button'>Delete</button></Link>
                        </div>
                    ))
                    : <h2>You have no listings.</h2>
                }
            </section>
        </section>
    )
}

export default MyListings;
