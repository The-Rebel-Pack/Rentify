import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { ListingsContext } from '../../context/ListingsContext';

const EditListing = () => {

    const { id } = useParams();
    const { detailListings, setDetailListings } = useContext(ListingsContext)

    const editData = async (listing) => {
        try {
            console.log(' edit listing:')
            const res = await axios({
                method: 'POST',
                url: `http://localhost:5000/api/listings/${id}`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                // data: {
                //     "category": listing.c_id,
                //     "title": listing.title,
                //     "details": {
                //         "description": listing.description,
                //         "images": listing.images
                //     },
                //     "price": {
                //         "day": listing.pricePerDay
                //     }
                // }
            });
            console.log(res);
            return res;

        } catch (err) {
            return ('err:', err);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await editData(detailListings);
        // if (res.status === 201) {
        //     setNewListing(emptyListing);
        //     setSelectedCategory(1)
        // } else {
        //     console.log('Post not inserted', res);
        //}
    }

    return (
        <form>
            <label htmlFor="">
                <input type="text" />
            </label>
            <label htmlFor="">
                <input type="text" />
            </label>
            <label htmlFor="">
                <input type="text" />
            </label>
            <label htmlFor="">
                <input type="text" />
            </label>
        </form>


    )
}

export default EditListing;
