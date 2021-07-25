import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';

const CreateListing = () => {

    const { categories, setCategories } = useContext(ListingsContext);

    const [selectedCategory] = useState(1);
    const emptyListing = {
        "name": '',
        "description": '',
        "images": [],
        "category": selectedCategory,
        "pricePerDay": '',
    }
    const [newListing, setNewListing] = useState(emptyListing);

    const fetchData = useCallback(
        async () => {
            const resCat = await axios.get('http://localhost:5000/api/listings/categories');
            setCategories(resCat.data);
        },
        [setCategories],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const postData = async (listing) => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:5000/api/listings',
                data: {
                    "category": listing.category,
                    "name": listing.name,
                    "details": {
                        "description": listing.name,
                        "images": listing.images
                    },
                    "price": {
                        "day": listing.pricePerDay
                    },
                    "owner": '1',
                }
            });
            return res;
        } catch (err) {
            return ('err:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await postData(newListing);
        if (res.status === 201) {
            setNewListing(emptyListing);
        } else {
            console.log('Post not inserted', res);
        }
    };

    const newListingInput = e => {
        const { name } = e.target;
        setNewListing({
            ...newListing,
            [name]: e.target.value,
        });
    };

    return (
        <section className='app__section add-listing'>
            <h2 className='add-listing__title'>Create a new listing</h2>
            <form id='add-listing' onSubmit={handleSubmit}>
                <h3 className='add-listing__sub-title'>Choose category for your listing</h3>
                <select
                    className='add-listing__select'
                    name='category'
                    onChange={newListingInput}
                    value={newListing.category}>
                    {categories && categories.map(a =>
                        <option value={a.id} key={a.id}>
                            {a.name}
                        </option>
                    )}
                </select>
                <br />
                <label htmlFor='name' className='add-listing__label'>Title for your listing</label>
                <input
                    type='text'
                    name='name'
                    value={newListing.name}
                    onChange={newListingInput}
                    className='add-listing__input'
                    autoComplete='off'
                    required="required"
                />
                <br />
                <label htmlFor='description' className='add-listing__label'>Description</label>
                <textarea
                    name='description'
                    value={newListing.description}
                    onChange={newListingInput}
                    className='add-listing__textarea'
                    required="required"
                />
                <br />
                <label htmlFor='pricePerDay' className='add-listing__label'>Price per day</label>
                <input
                    type='number'
                    name='pricePerDay'
                    value={newListing.pricePerDay}
                    onChange={newListingInput}
                    className='add-listing__input'
                    autoComplete='off'
                    required="required"
                />
                <br />
                <button type='submit' className='button'>
                    Add listing</button>
            </form>
        </section>
    )
}

export default CreateListing
