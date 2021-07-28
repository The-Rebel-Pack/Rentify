import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

import { ListingsContext } from '../../context/ListingsContext';
import useDebounce from './useDebounce';
import './style/Search.css'
import { FaSearch } from 'react-icons/fa';
import { QueryContext } from '../../context/QueryContext';

const Search = () => {
    let history = useHistory();
    let location = useLocation();
    let queryParams = qs.parse(location.search.replace(/[?]/, ''));

    const { categories, setListings, setPagination } = useContext(ListingsContext);
    const {
        fullCount,
        setFullCount,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
        queryPage,
        setQueryPage,
        queryCategories,
        setQueryCategories,
        querySearch,
        setQuerySearch
    } = useContext(QueryContext);

    // const [searchValue, setSearchValue] = useState(queryParams.search || '');
    // const [categoriesValue, setCategoriesValue] = useState(queryParams.categories || '');
    const [historyQueries, setHistoryQueries] = useState(null);

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
                console.log('null')
                return '';
            };
            const getTotalParams = () => {
                const allParams = [querySearch, queryCategories, queryPage];
                let count = 0;
                allParams.forEach(param => {
                    if (param.length > 0) count += 1;
                });
                return count;
            }
            const totalParams = getTotalParams();

            let queryParams = ``;
            if (querySearch > 0 || queryCategories > 0 || queryPage.length > 0) {
                queryParams += `?`;
            }
            if (querySearch > 0 && totalParams === 1) {
                queryParams += `search=${querySearch}`;
            }
            if (queryCategories > 0 && totalParams === 1) {
                queryParams += `categories=${queryCategories}`;
            }
            if (queryPage > 0 && totalParams === 1) {
                queryParams += `page=${queryPage}`;
            }
            if (querySearch > 0 && queryCategories > 0 && totalParams === 2) {
                queryParams += `search=${querySearch}`;
                queryParams += `&`;
                queryParams += `categories=${queryCategories}`;
            }
            if (querySearch > 0 && queryPage > 0 && totalParams === 2) {
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
            // let searchParam = ``;
            // if (searchTerm.length > 1) {
            //     searchParam = `search=${searchTerm}`
            // }

            // let categoriesParam = ``;
            // let selectedCategories = [];
            // if (categories) {
            //     selectedCategories = categories.filter(c => c.checked)
            // }
            // if (selectedCategories.length > 0) {
            //     categoriesParam = `categories=${selectedCategories.map(c => c.c_id)}`
            // }
            // let apperand = ``;
            // if (searchTerm && selectedCategories.length > 0) {
            //     apperand = `&`
            // }

            // let querySign = ``;
            // if (searchTerm || selectedCategories.length > 0) {
            //     querySign = `?`;
            // }
            // const res = await axios.get(`http://localhost:5000/api/listings${querySign}${searchParams}${apperand}${categoriesParam}`);
            const allParams = createQueries();
            console.log()
            const res = await axios.get(`http://localhost:5000/api/listings${allParams}`);
            setListings(res.data.listings);
            setQuerySearch(debounceSearch);
            setQueryCategories(debounceCategory);
            setTotalPages(res.data.total_pages);
            setCurrentPage(res.data.current_page);
            setFullCount(res.data.full_count);

            // setHistoryQueries(`${querySign}${searchParam}${apperand}${categoriesParam}`);
            setHistoryQueries(`${allParams}`);
        }
        fetchListings(debounceSearch);
    }, [categories, debounceSearch, debounceCategory, setListings, setHistoryQueries, setFullCount]);

    useEffect(() => {
        history.push(createQueries());
    }, [createQueries])

    useEffect(() => {
        setQueryPage(queryParams.page)
        setQueryCategories(queryParams.categories)
        setQuerySearch(queryParams.search)
    }, [
        setQueryPage,
        queryPage,
        setQueryCategories,
        queryCategories,
        setQuerySearch,
        querySearch
    ])

    return (
        <div className='search'>
            <form onSubmit={handleSubmit}>
                <input
                    id="search"
                    value={querySearch || ''}
                    type="text"
                    onChange={(e) => setQuerySearch(e.target.value)}
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
