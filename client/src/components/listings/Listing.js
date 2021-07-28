import React from 'react';
import { Link } from "react-router-dom";

const Listing = ({ listing, handleDelete }) => {
    return (
        <div className='listing'>
            {listing?.details?.images.length > 0 &&
                <Link to={`/listings/${listing.l_id}`} >
                    <div className='listing__image-container'
                        style={{
                            backgroundImage: `url("${listing?.details?.images[0]}")`
                        }}></div>
                </Link>
            }
            <Link to={`/listings/${listing.l_id}`} >
                <div className='listings__image-container'
                    style={{
                        backgroundImage: `url("${listing?.details?.images[0]}")`
                    }}></div>
            </Link>
            <Link to={`/listings/${listing.l_id}`} >
                <div className='listings__details-container'>
                    <h2 className='listings__details-title'>{listing.title}<span className='listings__details-category'>
                        <span className='categories__label'>
                            {listing.category}
                        </span>
                    </span></h2>
                    <span className='listings__details-price'>{listing?.price?.day} kr/day</span>
                </div>
            </Link>
            {handleDelete &&
                <>
                    <Link to={`/listings/edit/${listing.l_id}`} ><button className='button'>Edit</button></Link>
                    <button className='button' onClick={() => handleDelete(listing.l_id)} >Delete</button>
                </>
            }
        </div>
        // <div key={listing.l_id} >
        //     <h2>{listing.title}</h2>
        //     <p>{listing?.price?.day} kr</p>
        //     <p>{listing.category}</p>
        //     {listing?.details?.images.length > 0 &&
        //         <img src={listing?.details?.images[0]} alt={listing.title} width="150px" />
        //     }
        // <Link to={`/listings/edit/${listing.l_id}`} ><button className='button'>Edit</button></Link>
        // <button className='button' onClick={() => handleDelete(listing.l_id)} >Delete</button>
        // </div>
    )
}

export default Listing;
