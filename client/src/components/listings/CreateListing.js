import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { css } from '@emotion/react'
import { ListingsContext } from '../../context/ListingsContext';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router';
import './style/EditListing.css';
import { BeatLoader } from "react-spinners";

const loaderCSS = css`
margin-top : 25px;
margin-bottom : 25px;
display: flex;
align-items: center;
margin: 0 auto;
border-color: red;`

const CreateListing = () => {
    const { token } = useContext(AuthContext);
    const { categories, setCategories } = useContext(ListingsContext);
    const [image, setImage] = useState("");
    const history = useHistory();
    //const [selectedCategory, setSelectedCategory] = useState(1);
    const emptyListing = {
        "title": '',
        "description": '',
        "images": [],
        "c_id": 9,
        "pricePerDay": '',
    }
    const [newListing, setNewListing] = useState(emptyListing);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(
        async () => {
            const resCat = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/listings/categories`);
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
                url: `${process.env.REACT_APP_API_BASE_URL}/api/listings`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    "category": listing.c_id,
                    "title": listing.title,
                    "details": {
                        "description": listing.description,
                        "location": listing.location,
                        "images": image ? [image] : [],
                    },
                    "price": {
                        "day": listing.pricePerDay
                    }
                }
            });
            return res;
        } catch (err) {
            return ('err:', err);
        }
    };


    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "rentify");
        setLoading(true);

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/ddenalelw/image/upload",
            { method: "POST", body: data }
        );
        const file = await res.json();
        setImage(file.secure_url);
        setLoading(false);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await postData(newListing);
        setImage([]);
        if (res.status === 201) {
            setNewListing(emptyListing);
            history.push('/profile')
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
            <h2 className='section__title'>Create a new listing</h2>
            <form id='add-listing' onSubmit={handleSubmit}>
                <label htmlFor='c_id' className='add-listing__label'>Choose category for your listing</label>
                <select
                    className='add-listing__select'
                    name='c_id'
                    onChange={newListingInput}
                    value={newListing.c_id || ''}>
                    {categories && categories.map(a =>
                        <option value={a.c_id} key={a.c_id}>
                            {a.category}
                        </option>
                    )}
                </select>
                <br />
                <label htmlFor='title' className='add-listing__label'>Title for your listing</label>
                <input
                    type='text'
                    name='title'
                    value={newListing.title || ''}
                    onChange={newListingInput}
                    className='add-listing__input'
                    autoComplete='off'
                    required="required"
                />
                <br />
                <label htmlFor='location' className='add-listing__label'>Location</label>
                <input
                    type='text'
                    name='location'
                    value={newListing.location || ''}
                    onChange={newListingInput}
                    className='add-listing__input'
                    autoComplete='off'
                />
                <br />
                <label htmlFor='description' className='add-listing__label'>Description</label>
                <textarea
                    name='description'
                    value={newListing.description || ''}
                    onChange={newListingInput}
                    className='add-listing__textarea'
                    required="required"
                />
                <br />
                <label htmlFor='pricePerDay' className='add-listing__label'>Price per day</label>
                <input
                    type='number'
                    name='pricePerDay'
                    value={newListing.pricePerDay || ''}
                    onChange={newListingInput}
                    className='add-listing__input'
                    autoComplete='off'
                    required="required"
                />
                <br />
                <p className='add-listing__label'>Upload an image</p>
                {loading ? (
                    <BeatLoader css={loaderCSS} size={20} color="green" />
                ) : (image && <><img src={image} alt={image} style={{ width: "300px" }} /><br /></>)}
                <input
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={uploadImage}
                />
                <br />
                <br />
                <button type='submit' className='button'>
                    Add listing
                </button>
            </form>
        </section>
    )
}

export default CreateListing
