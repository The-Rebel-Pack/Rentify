import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContactInfo = () => {
    const [contactInfo, setContactInfo] = useState(null);
    const fetchData = useCallback(
        async () => {
            const res = await axios.get(`http://localhost:5000/api/users/1`);
            setContactInfo(res.data);
        },
        [setContactInfo],
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <h1>Contact</h1>
                {contactInfo && contactInfo.map((contact) => (
                    <div key={contact.id} >
                        <h2>Name: {contact.name}</h2>
                        <h2>Email: {contact.email}</h2>
                    </div>
                ))}
        </div>
    )
}

export default ContactInfo
