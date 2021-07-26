import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const EditListing = () => {

    const fetchData = useCallback(
        async () => {
            const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
            setListing(res.data);
        },
        [setListing, id],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div>
            <h1>Edit listing</h1>
        </div>
    )
}

export default EditListing
