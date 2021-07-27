import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

import { ListingsContext } from '../../context/ListingsContext';
import useDebounce from './useDebounce';
import './style/Search.css'
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    let history = useHistory();
    let location = useLocation();
    let searchQueries = qs.parse(location.search.replace(/[?]/, ''));

    const { categories, setListings } = useContext(ListingsContext);
    const [searchValue, setSearchValue] = useState(searchQueries.search || '');
    const [categoriesValue, setCategoriesValue] = useState(searchQueries.categories || '');

    const debounceSearch = useDebounce(searchValue, 250);
    const debounceCategory = useDebounce(categoriesValue, 250);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const fetchListings = async (searchTerm) => {
            let searchParam = ``;
            if (searchTerm !== ``) {
                searchParam = `search=${searchTerm}`
            }

            let categoriesParam = categoriesValue;
            let selectedCategories = [];
            if (categories) {
                selectedCategories = categories.filter(c => c.checked)
            }
            if (selectedCategories.length > 0) {
                categoriesParam = `categories=${selectedCategories.map(c => c.c_id)}`
            }
            let apperand = ``;
            if (searchTerm && selectedCategories.length > 0) {
                apperand = `&`
            }

            let querySign = ``;
            if (searchTerm || selectedCategories.length > 0) {
                querySign = `?`;
            }
            const res = await axios.get(`http://localhost:5000/api/listings${querySign}${searchParam}${apperand}${categoriesParam}`);
            if (res.data === 'No listings to show') {
                return setListings(null);
            }
            setListings(res.data);
            setSearchValue(debounceSearch);
            setCategoriesValue(debounceCategory);
            history.push(`${querySign}${searchParam}${apperand}${categoriesParam}`);
        }
        fetchListings(debounceSearch);
    }, [categories, debounceSearch, debounceCategory, setListings]);

    return (
        <div className='search'>
            <form onSubmit={handleSubmit}>
                <input
                    id="search"
                    value={searchValue}
                    type="text"
                    onChange={(e) => setSearchValue(e.target.value)}
                    autoComplete='off'
                    placeholder='Start your search'
                    className='search__input'
                />
                <button
                    type="submit"
                    className='button button--icon search__button'
                ><FaSearch /></button>
            </form>
        </div>
    )
}

export default Search
