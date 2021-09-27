import React, { createContext, useState } from 'react'

export const QueryContext = createContext();

const QueryContextProvider = (props) => {
    const [query, setQuery] = useState({
        fullCount: '',
        totalPages: '',
        currentPage: '',
        getPage: '',
        categories: '',
        search: ''
    })
    const [fullCount, setFullCount] = useState('')
    const [totalPages, setTotalPages] = useState('');
    const [currentPage, setCurrentPage] = useState('');
    const [queryPage, setQueryPage] = useState('');
    const [queryCategories, setQueryCategories] = useState('')
    const [querySearch, setQuerySearch] = useState('');

    const value = {
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
        setQuerySearch,
        query,
        setQuery
    }

    return (
        <QueryContext.Provider value={value}>
            {props.children}
        </QueryContext.Provider>
    )
}

export default QueryContextProvider
