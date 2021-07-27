import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';
import { AuthContext } from '../../context/AuthContext';

const CreateListing = () => {
    const { token } = useContext(AuthContext);
    const { categories, setCategories } = useContext(ListingsContext);
    const [image, setImage] = useState("");
    //const [selectedCategory, setSelectedCategory] = useState(1);
    const emptyListing = {
        "title": '',
        "description": '',
        "images": [],
        "c_id": 1,
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
           // console.log('Triggered post listing: ', listing)
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:5000/api/listings',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    "category": listing.c_id,
                    "title": listing.title,
                    "details": {
                        "description": listing.description,
                        "images": [image]
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
        console.log(files);
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "rentify");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/ddenalelw/image/upload",
            { method: "POST", body: data }
        );
        const file = await res.json();
        setImage(file.secure_url);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        uploadImage()
        const res = await postData(newListing);
        if (res.status === 201) {
            setNewListing(emptyListing);
         //   setSelectedCategory(1)
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
                    name='c_id'
                    onChange={newListingInput}
                    value={newListing.c_id}>
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
                    value={newListing.title}
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
                <h4>Upload Image</h4>
                <input
                    type="file"
                    name="file"
                    placeholder="Upload Image"
                    onChange={uploadImage}
                />
{                console.log(image)
}                <img src={image} alt={image} style={{ width:"300px" }} />

                <br />

                <button type='submit' className='button'>
                    Add listing</button>
            </form>
        </section>
    )
}

export default CreateListing
