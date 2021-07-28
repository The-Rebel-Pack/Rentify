import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import MyListings from '../listings/MyListings';

const Profile = () => {
    const [data, setData] = useState(null)
    const { token } = useContext(AuthContext)

    const fetchData = useCallback(
        async (token) => {
            const res = await axios.get('http://localhost:5000/api/users/unique', {
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

    return (
        <section className='app__section'>
            {data && data.map((contact) => (
                <>
                    <h2 className='section__title'>Hi {contact.first_name}</h2>
                    <h3>Your listings</h3>
                    <p><Link to={`/listings/create`} ><button className='button'>Create new listing</button></Link></p>
                    <h3>These are your current active listings</h3>
                    <MyListings />
                    <div className='profile-details'>
                        <h3>Your personal details</h3>
                        <div key={contact.u_id}>
                            <p>Name: {contact.full_name}</p>
                            <p>Email: {contact.email}</p>
                            <p>Public Contact Information</p>
                            {contact.u_details?.email
                                && <p>Email: {contact.u_details?.email}</p>}
                            {contact.u_details?.phone
                                && <p>Phone Number: {contact.u_details?.phone}</p>}
                        </div>
                    </div>
                </>
            ))}
        </section>
    )
}

export default Profile;
