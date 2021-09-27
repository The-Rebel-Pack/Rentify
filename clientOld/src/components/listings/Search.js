import React, { useEffect, useContext, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { ListingsContext } from '../../context/ListingsContext';
import useDebounce from './useDebounce';
import './style/Search.css'
import { FaSearch } from 'react-icons/fa';
import { QueryContext } from '../../context/QueryContext';
import { updateStateObject } from '../../utils/updateStateObject';

const Search = () => {
    let history = useHistory();

    const { categories, setListings } = useContext(ListingsContext);
    const {
        query,
        setQuery,
        setFullCount,
        setTotalPages,
        setCurrentPage,
        queryPage,
        setQueryPage,
        queryCategories,
        setQueryCategories,
        querySearch,
        setQuerySearch
    } = useContext(QueryContext);

    const createCategoriesValue = useCallback(() => {
        let categoriesParam = ``;
        let selectedCategories = [];
        if (categories) {
            selectedCategories = categories.filter(c => c.checked);
        }
        if (selectedCategories.length > 0) {
            categoriesParam = `${selectedCategories.map(c => c.c_id)}`;
        }
        return categoriesParam;
    }, [categories]);

    const createQueries = useCallback(
        () => {
            if (!querySearch && !queryCategories && !queryPage) {
                return '';
            };
            const getTotalParams = () => {
                const allParams = [querySearch, queryCategories, queryPage];
                let count = 0;
                allParams.forEach(param => {
                    if (param) {
                        count += 1;
                    }
                });
                return count;
            }
            const totalParams = getTotalParams();

            let queryParams = ``;
            if (querySearch || queryCategories || queryPage) {
                queryParams += `?`;
            }
            if (querySearch && totalParams === 1) {
                queryParams += `search=${querySearch}`;
            }
            if (queryCategories && totalParams === 1) {
                queryParams += `categories=${queryCategories}`;
            }
            if (queryCategories && queryPage && totalParams === 2) {
                queryParams += `categories=${queryCategories}`;
                queryParams += `&`;
                queryParams += `page=${queryPage}`;
            }
            if (queryPage && totalParams === 1) {
                queryParams += `page=${queryPage}`;
            }
            if (querySearch && queryCategories && totalParams === 2) {
                queryParams += `search=${querySearch}`;
                queryParams += `&`;
                queryParams += `categories=${queryCategories}`;
            }
            if (querySearch && queryPage && totalParams === 2) {
                queryParams += `search=${querySearch}`;
                queryParams += `&`;
                queryParams += `page=${queryPage}`;
            }
            if (totalParams === 3) {
                queryParams += `search=${querySearch}`;
                queryParams += `&`;
                queryParams += `categories=${queryCategories}`;
                queryParams += `&`;
                queryParams += `page=${queryPage}`;
            }
            return queryParams;
        },
        [queryPage, queryCategories, querySearch],
    );

    const debounceSearch = useDebounce(querySearch, 250);
    const debounceCategory = useDebounce(queryCategories, 250);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const fetchListings = async () => {
            const allParams = createQueries();
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/listings${allParams}`);
            setListings(res.data.listings);
            setTotalPages(res.data.total_pages);
            setCurrentPage(res.data.current_page);
            setFullCount(res.data.full_count);
            updateStateObject(setQuery, 'testkey', '1')
            updateStateObject(setQuery, 'anotherkey', '2')
        }
        fetchListings(debounceSearch);
    }, [categories, queryPage, debounceSearch, debounceCategory, setListings, setFullCount, createQueries, setCurrentPage, setTotalPages]);

    useEffect(() => {
        history.push(createQueries());
    }, [createQueries, queryPage, history])

    useEffect(() => {
        setQueryCategories(createCategoriesValue())
    }, [categories, setQueryCategories, createCategoriesValue])

    useEffect(() => {
        setQueryPage(null)
    }, [querySearch, queryCategories, setQueryPage])

    return (
        <div className='search'>
            <form onSubmit={handleSubmit}>
                <input
                    id="search"
                    value={querySearch || ''}
                    type="text"
                    onChange={(e) => updateStateObject(setQuery, 'search', e.target.value)}
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
