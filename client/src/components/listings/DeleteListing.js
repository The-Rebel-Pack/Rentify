import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
const DeleteListing = () => {

    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [deleteList, setDeleteList] = useState(null);

    const fetchData = useCallback(
        async () => {
            const res = await axios.get(`http://localhost:5000/api/listings/user/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setDeleteList(res.data[0]);
        },
        [setDeleteList, token],
    );
    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token, fetchData]);

    const handleDelete = (id) => {
        const newList = deleteList.filter((item) => item.id !== id);

        setDeleteList(newList);

    }

    return (
        <div>
            <h1>Delete listing</h1>
            {deleteList.length > 0 &&
                <button type='submit' className='button' onClick={() => handleDelete(deleteList.l_id)} >Delete</button>
            }
        </div>
    )
}

export default DeleteListing
