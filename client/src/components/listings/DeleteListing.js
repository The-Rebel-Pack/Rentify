import React, { useContext } from 'react'
import { ListingsContext } from '../../context/ListingsContext'

const DeleteListing = () => {

    const { listings, setListings } = useContext(ListingsContext)

    const handleDelete = (id) => {
        const deleteItem = listings.filter(list => list.id !== id);
        console.log(deleteItem)
        setListings(deleteItem);
    }

    return (

        <div>
            <button type="button" onClick={() => handleDelete(listings.id)} >Delete</button>
        </div>
    )
}

export default DeleteListing
