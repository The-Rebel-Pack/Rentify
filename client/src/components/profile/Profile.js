import React, { useEffect, useState, useCallback, useContext } from 'react';
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
            {data?.message}
        </div>
    )
}

export default Profile;
