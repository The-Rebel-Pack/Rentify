import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

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
        <div>
            <h2>Profile</h2>
            <p>Welcome to your profile page!</p>
            {data && data.map((contact) => (
                <div key={contact.u_id}>
                    <h3>Name: {contact.full_name}</h3>
                    <h3>Email: {contact.email}</h3>
                    <h3>Public Contact Information</h3>
                    <h4>Email:</h4>
                    <p>{contact.u_details?.email}</p>
                    <h4>Phone Number:</h4>
                    <p>{contact.u_details?.phone}</p>
                </div>
            ))}
            <p><Link to={`/listings/create`} ><button>Create new listing</button></Link></p>
            <p><Link to={`/listings/my-listings`} ><button>See your listings</button></Link></p>
            {/* <p>{data?.message}</p> */}
        </div>
    )
}

export default Profile;
