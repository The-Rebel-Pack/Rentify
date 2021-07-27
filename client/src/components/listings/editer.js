import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { ListingsContext } from '../../context/ListingsContext';
import { AuthContext } from '../../context/AuthContext';

const EditListing = () => {

    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [singleList, setSingleList] = useState(null)
    const [editListing, setEditListing] = useState("initialState");
    const [editing, setEditing] = useState(false);
    const emptyList = {
        "title": '',
        "description": '',
        "images": [],
        "c_id": 1,
        "pricePerDay": '',
    }
    const [currentList, setCurrentList] = useState(emptyList);

    const editList = (detail) => {
        setEditing(true);
        setCurrentList({ title: detail.id, description: detail.description, images: detail.images, c_id: detail.c_id, pricePerDay: detail.pricePerDay, });
    }

    const updateList = (id, updateList) => {
        setEditing(false);
        setSingleList(singleList.map((list) => (list.id === id ? updateList : list)));
    };

    const fetchData = useCallback(
        async () => {
            const resList = await axios.get(`http://localhost:5000/api/listings/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            console.log(resList);
            setSingleList(resList.data);
        },
        [setSingleList],
    );

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token, fetchData]);

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
                //            "images": listing.images
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
        await editData(singleList);
        updateList(currentList.id, currentList)
        // if (res.status === 201) {
        //     setNewListing(emptyListing);
        // } else {
        //     console.log('Post not inserted', res);
        //}
    }

    const editListingInput = e => {
        const { name, value } = e.target;
        setEditListing({
            ...editListing,
            [name]: value,
        });
    };

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor='title' className='add-listing__label'>Title for your listing</label>
            <input
                type='text'
                name='title'
                value={singleList.title}
                onChange={editListingInput}
                className='add-listing__input'
                autoComplete='off'
                required="required"
            />
            <br />
            <label htmlFor='description' className='add-listing__label'>Description</label>
            <textarea
                name='description'
                value={singleList.description}
                onChange={editListingInput}
                className='add-listing__textarea'
                required="required"
            />
            <br />
            <label htmlFor='pricePerDay' className='add-listing__label'>Price per day</label>
            <input
                type='number'
                name='pricePerDay'
                value={singleList.pricePerDay}
                onChange={editListingInput}
                className='add-listing__input'
                autoComplete='off'
                required="required"
            />
            <br />
            <button type='submit' className='button'>Update listing</button>
            <button type='submit' className='button' onClick={() => setEditing(false)}
            >Cancel</button>
        </form>


    )
}

export default EditListing;
