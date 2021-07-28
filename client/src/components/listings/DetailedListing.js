import React, { useEffect, useCallback, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { ListingsContext } from '../../context/ListingsContext';
import { FiClock } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import './style/DetailedListing.css';

const DetailedListing = () => {

    const { auth } = useContext(AuthContext)
    const { detailListings, setDetailListings } = useContext(ListingsContext)
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
        <section className='app__section listing-section'>
            {detailListings &&
                <div className='detailed-listing' key={detailListings.id} >
                    <h2 className='listing__title'>{detailListings.title} <Link to={`/?categories=${detailListings.c_id}`} className='clearfix'>
                        <span className='listings__details-category'>
                            <span className='categories__label'>
                                {detailListings.category}
                            </span>
                        </span>
                    </Link>
                    </h2>
                    {detailListings.details?.location &&
                        <p><HiOutlineLocationMarker /> {detailListings.details.location}</p>
                    }
                    {detailListings.details?.images &&
                        <section className='listings-section__grid'>
                            {detailListings.details?.images.map((image, idx) =>
                                <div key={idx} className='listings__image-container listings__image-container--single' style={{
                                    backgroundImage: `url("${image}")`
                                }}>
                                </div>)}
                        </section>}
                    <h3 className='listings__details-title'>Details about {detailListings.title}:</h3>
                    <p className='listing__description'>{detailListings.details?.description}</p>
                    <p className='listing__price'>{detailListings.price?.day} kr/day</p>
                    <div class="listing__meta-details">
                        <p><FiClock /> Last updated: {detailListings.updated_at}</p>
                    </div>
                    <div class="listing__contact-details">
                        {auth ? <>
                            <h3 className='listings__details-title'>Contact owner</h3>
                            <div className='listing__contact-details'>
                                <p>Rented out by: {detailListings.first_name} {detailListings.last_name}</p>
                                <p>E-mail: <a href={`mailto:${detailListings.email}`}><button className='button'>Send an e-mail to {detailListings.first_name} {detailListings.last_name}</button></a></p>
                                <p>Phone: {detailListings.u_details?.phone}</p>
                            </div></>
                            :
                            <><h3 className='listings__details-title'>Log in to contact owner</h3></>}
                    </div>
                </div>
            }
        </section >
    )
}


export default DetailedListing
