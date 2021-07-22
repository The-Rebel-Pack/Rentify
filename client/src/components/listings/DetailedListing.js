import React from 'react'

const SingleListing = ({ name, details, category }) => {
    return (
        <div>
            <img src={details?.images[0]} alt={listing.name} width="200px" />
            <h1>{name}</h1>
            <p>50 kr</p>
            <p>{details.description}</p>
        </div>
    )
}

export default SingleListing
