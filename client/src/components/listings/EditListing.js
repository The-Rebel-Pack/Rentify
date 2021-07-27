import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const EditListing = () => {

    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [formValue, setFormValue] = useState(null);
    const [price, setPrice] = useState(null);

    const fetchData = useCallback(
        async () => {
            const res = await axios.get(`http://localhost:5000/api/listings/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setCurrentEdit(res.data[0]);
            console.log()
        },
        [setCurrentEdit],
    );
    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token, fetchData]);

    useEffect(() => {
        if (currentEdit?.title && currentEdit?.details?.description && currentEdit?.price?.day ) {
            const { title } = currentEdit;
            const { description } = currentEdit.details;
            const price = currentEdit.price.day;
            setFormValue({ title, description });
            setPrice(price);
        }
    }, [setFormValue, currentEdit])

    const editData = async (data) => {
        try {
            const res = await axios({
                method: 'POST',
                url: `http://localhost:5000/api/listings/${id}`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                data: data
            });
            console.log(res);
            if(res.status === 201){
                setCurrentEdit(res.data)
            }
        } catch (err) {
            return ('err:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        await editData({
            ...currentEdit,
            category: currentEdit.c_id,
            title: formValue.title,
            details: {
                ...currentEdit.details,
                description: formValue.description
            },
            price: {
                ...currentEdit.price,
                day: price
            }
        });
    }

    const editListingInput = e => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const editPrice = e => {
        const { value } = e.target;
        setPrice(value);
    };

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor='title' className='add-listing__label'>Title for your listing</label>
            <input
                type='text'
                name='title'
                value={formValue?.title || ''}
                onChange={editListingInput}
                className='add-listing__input'
                autoComplete='off'
                required="required"
            />
            <br />
            <label htmlFor='description' className='add-listing__label'>Description</label>
            <textarea
                name='description'
                value={formValue?.description || ''}
                onChange={editListingInput}
                className='add-listing__textarea'
                required="required"
            />
            <br />
            <label htmlFor='priceperday' className='add-listing__label'>Price per day</label>
            {console.log(price)}
            <input
                type='number'
                name='pricePerDay'
                value={price || ''}
                onChange={editPrice}
                className='add-listing__input'
                autoComplete='off'
                required="required"
            />
            <br />

            <div>
                <button type='submit' className='button'>Save</button>
            </div>
        </form>


    )
}

export default EditListing;
