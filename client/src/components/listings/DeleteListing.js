import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { ListingsContext } from '../../context/ListingsContext';
const DeleteListing = ({myListings, setMyListings}) => {

    //const { myListings, setMyListings } = useContext(ListingsContext);
    const [deleteList, setDeleteList] = useState(null);
    const { id } = useParams();
    const fetchDelete = useCallback(
        async () => {
            const res = await axios.delete(`http://localhost:5000/api/listings/${id}`);
            console.log(res)
            setDeleteList(res.data[0]);
        },
        [setDeleteList],
    );
    useEffect(() => {
        fetchDelete();
    }, [fetchDelete, myListings]);

    const handleDelete = (id) => {
        alert(id);
        const newList = myListings.filter((item) => item.id !== id);

        setMyListings(newList);

    }

    return (
        <div>
            <h1>Delete listing</h1>
            <button type='submit' className='button' onClick={() => handleDelete(myListings.l_id)} >Delete</button>
        </div>
    )
}

export default DeleteListing
