import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';

const CreateListing = () => {

    const { categories, setCategories } = useContext(ListingsContext);

    // const [selectedCategory, setSelectedCategory] = useState('');
    const [newListing, setNewListing] = useState({});

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewListing({});
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
            <h1 className='add-listing__title'>Create a new listing</h1>
            <form id='add-listing' onSubmit={handleSubmit} noValidate>
                <h2>Choose category for your listing</h2>
                <h3 className='add-listing__sub-title'>Category</h3>
                {console.log(categories)}
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
                <label htmlFor='name' className='add-listing__label'>Name</label>
                <input
                    type='text'
                    name='name'
                    value={newListing.name}
                    onChange={newListingInput}
                    className='add-listing__input'
                    autoComplete='off'
                />
                <br />
                <label htmlFor='images' className='add-listing__label'>Image</label>
                <input
                    type='url'
                    name='link'
                    value={newListing.images}
                    onChange={newListingInput}
                    className='add-listing__input'
                    autoComplete='off'
                />
                <br />

                <textarea className='add-listing__textarea' />
                <br />
                <input
                    type='hidden'
                    name='owner'
                    value='1'
                />
                <button type='submit' className='button'>
                    Add listing</button>
            </form>
        </section>
    )
}

export default CreateListing
