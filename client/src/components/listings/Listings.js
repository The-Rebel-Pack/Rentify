import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Listings = () => {
    const [data, setData] = useState(null)
    const { token } = useContext(AuthContext)

    const fetchData = useCallback(
        async (token) => {
            const res = await axios.get('http://localhost:5000/api/listings', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            await setData(res.data);
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
            <h1>Listings</h1>
            {console.log(data)}
            {data && data.listings.map((item, idx) => (
                <h2 key={idx}>{item.title}</h2>
            ))}
        </div>
    )
}

export default Listings;
