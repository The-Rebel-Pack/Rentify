import React, { useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { ListingsContext } from '../../context/ListingsContext';
import { FiClock } from 'react-icons/fi';

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
        <>
            {detailListings &&
                <div className='listing' key={detailListings.l_id} >
{                    console.log(detailListings)
}                    <h2 className='listing__title'>{detailListings.title}</h2>
                    <p><span className='listing__category'>{detailListings.category}</span></p>
                    <p className='listing__price'>{detailListings.price?.day} kr/day</p>
                    {detailListings.details?.images &&
                        detailListings.details?.images.map((image, idx) =>
                            <div key={idx}>
                                <img className='listing__image' src={image} alt={detailListings.title} />
                            </div>)}
                    <p className='listing__description'>{detailListings.details?.description}</p>
                    <p><FiClock /> Last updated: {detailListings.updated_at}</p>
                    {auth ? <>
                        <h3 className='listing__contact-title'>Contact owner</h3>
                        <div className='listing__contact-details'>
                            <p>Name: {detailListings.first_name} {detailListings.last_name}</p>
                            <p>E-mail: <Link to="#">Send e-mail</Link></p>
                            <p>Phone: {detailListings.u_details?.phone}</p>
                        </div></>
                        :
                        <><h3>Log in to contact owner</h3></>}
                </div>
            }
        </>
    )
}


export default DetailedListing
