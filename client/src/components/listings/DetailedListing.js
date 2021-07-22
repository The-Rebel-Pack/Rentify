import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
const SingleListing = () => {

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
                    <p>50 kr</p>
                    <img src={listing?.details?.images[0]} alt={listing.name} width="100px" />
                    <p>{listing?.details?.description}</p>
                </div>
            }
        </>
    )
}


export default SingleListing
