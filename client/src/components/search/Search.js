import React, { useEffect, useContext, useState } from 'react';
import { QueryContext } from '../../contexts/QueryContext';
import useDebounce from '../../utils/useDebounce';
import { FaSearch } from 'react-icons/fa';
import './Search.css';

const Search = () => {
  const { query, setQuery } = useContext(QueryContext);
  const [searchInput, setSearchInput] = useState(query.search);

  const debouncedSearchTerm = useDebounce(searchInput, 200);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (query.search !== debouncedSearchTerm) {
      return setQuery(prevState => ({
        ...prevState,
        page: '',
        search: debouncedSearchTerm || ''
      }));
    };
  }, [debouncedSearchTerm, setQuery, query]);

  return (
    <div className='search'>
      <input
        id="search"
        value={searchInput}
        type="text"
        onChange={handleChange}
        autoComplete='off'
        placeholder='Start your search'
        className='search__input'
      />
      <button
        type="button"
        className='button button--icon search__button'
      ><FaSearch /></button>
    </div>
  );
};

export default Search;
