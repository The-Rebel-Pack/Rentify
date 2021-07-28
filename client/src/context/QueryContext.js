import React, { createContext, useState } from 'react'

export const QueryContext = createContext();

const QueryContextProvider = (props) => {
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
        setQuerySearch
    }

    return (
        <QueryContext.Provider value={value}>
            {props.children}
        </QueryContext.Provider>
    )
}

export default QueryContextProvider
