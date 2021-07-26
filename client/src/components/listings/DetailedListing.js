import React, { useEffect, useCallback, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const SingleListing = () => {

    const { auth } = useContext(AuthContext)
    const [listing, setListing] = useState(null)

    const { id } = useParams();

    const fetchData = useCallback(
        async () => {
            const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
            setListing(res.data[0]);
        },
        [setListing, id],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {listing &&
                <div className='listing' key={listing?.id} >
                    <h2 className='listing__title'>{listing?.title}</h2>
                    <h2 className='listing__category'>{listing?.category}</h2>
                    <p className='listing__price'>{listing?.price?.day} kr</p>
                    {listing?.details?.images && <>
                        <img className='listing__image' src={listing?.details?.images[0]} alt={listing.title} width="500px" /> </>}
                    <p className='listing__description'>{listing?.details?.description}</p>
                    {auth && <>
                        <h3 className='listing__contact-title'>Contact owner</h3>
                        <div className='listing__contact-details'><button>Send e-mail</button></div></>}
                </div>
            }
        </>
    )
}


export default SingleListing
