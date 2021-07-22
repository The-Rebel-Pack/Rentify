import React, { useState } from 'react';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search" />
            <input id="search" value={searchValue} type="text" onChange={(e) => setSearchValue(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search
