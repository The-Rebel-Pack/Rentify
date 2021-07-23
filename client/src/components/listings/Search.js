import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';
import useDebounce from './useDebounce';

const Search = () => {
    const { setListings } = useContext(ListingsContext);
    const [searchValue, setSearchValue] = useState('');

    const debounceValue = useDebounce(searchValue, 150);

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    useEffect(() => {
        const fetchListings = async (searchTerm) => {
            const res = await axios.get(`http://localhost:5000/api/listings?search=${searchTerm}`);
            setListings(res.data);
            setSearchValue(debounceValue);
        }
        fetchListings(debounceValue);
    }, [debounceValue, setListings]);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search" />
            <input id="search" value={searchValue} type="text" onChange={(e) => setSearchValue(e.target.value)} autoComplete='off' />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search
