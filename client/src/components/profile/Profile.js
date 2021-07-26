import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ContactInfo from './ContactInfo';
const Profile = () => {
    const [data, setData] = useState(null)
    const { auth, token } = useContext(AuthContext)

    const fetchData = useCallback(
        async (token) => {
            const res = await axios.get('http://localhost:5000/api/protectedroute', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            console.log(res.data.message)
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

            {auth && token && <Link to="/" component= {ContactInfo} /> }
            <p><Link to={`/listings/create`} ><button>Create new listing</button></Link></p>
            <p><Link to={`/listings/my-listings`} ><button>See your listings</button></Link></p>
            {/* <p>{data?.message}</p> */}
        </div>
    )
}

export default Profile;
