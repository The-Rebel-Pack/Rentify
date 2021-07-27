import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import './style/Listings.css';
import { ListingsContext } from '../../context/ListingsContext';

const MyListings = () => {
    const { myListings } = useContext(ListingsContext);

    return (
        <section className='app__section listings-section'>
            <section className='listings-section__grid'>
                {myListings.length > 0
                    ?
                    myListings.map(listing => (
                        <div key={listing.l_id} >
                            <h2>{listing.title}</h2>
                            <p>{listing?.price?.day} kr</p>
                            <p>{listing.category}</p>
                            {listing?.details?.images.length > 0 &&
                                <img src={listing?.details?.images[0]} alt={listing.title} width="150px" />
                            }
                            <Link to={`/listings/edit/${listing.l_id}`} ><button className='button'>Edit</button></Link>
                            <Link to={`/listings/delete/${listing.l_id}`} ><button className='button'>Delete</button></Link>
                        </div>
                    ))
                    : <h2>You have no listings.</h2>
                }
            </section>
        </section>
    )
}

export default MyListings;
