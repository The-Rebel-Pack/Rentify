import './Profile.css';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import MyListings from '../listings/MyListings';
import Heading from '../listings/Heading';

const Profile = () => {
    const [data, setData] = useState(null)
    const { token } = useContext(AuthContext)

    const fetchData = useCallback(
        async (token) => {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/unique`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            setData(res.data);
        },
        [],
    );

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token, fetchData]);

    const returnFirstLetter = (word) => {
        return word[0];
    }

    return (
        <section className='profile'>
            {data && data.map((contact) => (
                <div key='1'>
                    <section className='app__section'>
                        <Heading heading={`Hi ${contact.first_name}`} />
                        <h3 className='section__sub-title'>Would you like to create a new listing?</h3>
                        <p><Link to={`/listings/create`} ><button className='button'>Create new listing</button></Link></p>
                    </section>
                    <section className='app__section'>
                        <h3 className='section__sub-title'>These are your current active listings:</h3>
                        <MyListings />
                    </section>
                    <section className='app__section'>
                        <div className='profile-details'>
                            <h3 className='section__sub-title'>Your personal details</h3>
                            <div key={contact.u_id}>
                                <p>Name: {contact.full_name}</p>
                                <p>Email: {contact.email}</p>
                                <h3 className='section__sub-title'>Public contact information for your listings</h3>
                                <p>Name: {contact.first_name} {returnFirstLetter(contact.last_name)}</p>
                                {contact.u_details?.email
                                    && <p>Email: {contact.u_details?.email}</p>}
                                {contact.u_details?.phone
                                    && <p>Phone Number: {contact.u_details?.phone}</p>}
                            </div>
                        </div>
                    </section>
                </div>
            ))}
        </section>
    )
}

export default Profile;
