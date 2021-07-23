import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const [data, setData] = useState(null)
    const { token } = useContext(AuthContext)

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
            <h1>Profile</h1>
            <Link to={`/listings/create`} ><button>Create new listing</button></Link>
            <p>{data?.message}</p>
        </div>
    )
}

export default Profile;
