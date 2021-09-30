import React from 'react';
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiPriceTag3Line } from 'react-icons/ri';

const Listing = ({ listing }) => {
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
          <span className='listings__details-price'><RiPriceTag3Line /> {listing?.price?.day} kr/day</span>
          <br />
          <span className='listings__details-location'><HiOutlineLocationMarker /> {listing?.details?.location || 'Stockholm, Sweden'}</span>
        </div>
      </Link>
    </div>
  )
}

export default Listing;
