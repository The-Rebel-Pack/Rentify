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
                <div key={listing?.id} >
                    <h2>{listing?.name}</h2>
                    <p>{listing?.price?.day} kr</p>
                    <img src={listing?.details?.images[0]} alt={listing.name} width="500px" />
                    <p>{listing?.details?.description}</p>
                    {auth && <>
                        <h3>Contact owner</h3>
                        <p><button>Send e-mail</button></p></>}
                </div>
            }
        </>
    )
}


export default SingleListing
