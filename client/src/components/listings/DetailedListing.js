import React, { useEffect, useCallback, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const SingleListing = () => {

    const { auth } = useContext(AuthContext)
    const [detailListings, setDetailListings] = useState(null)

    const { id } = useParams();

    const fetchData = useCallback(
        async () => {
            const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
            setDetailListings(res.data[0]);
        },
        [setDetailListings, id],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {detailListings &&
                <div className='listing' key={detailListings?.id} >
                    <h2 className='listing__title'>{detailListings?.title}</h2>
                    <h2 className='listing__category'>{detailListings?.category}</h2>
                    <p className='listing__price'>{detailListings?.price?.day} kr</p>
                    {detailListings?.details?.images && <>
                        <img className='listing__image' src={detailListings?.details?.images[0]} alt={detailListings.title} width="500px" /> </>}
                    <p className='listing__description'>{detailListings?.details?.description}</p>
                    {auth && <>
                        <h3 className='listing__contact-title'>Contact owner</h3>
                        <div className='listing__contact-details'><button>Send e-mail</button></div></>}
                </div>
            }
        </>
    )
}


export default SingleListing
