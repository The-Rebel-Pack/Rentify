import React, { useContext } from 'react';
import { QueryContext } from '../../contexts/QueryContext';
import { ListingsContext } from '../../contexts/ListingsContext';
import { updateStateObject } from '../../utils/updateStateObject';
import './Pagination.css'

const Pagination = () => {
  const { setQuery } = useContext(QueryContext);
  const { listingStats } = useContext(ListingsContext);

  const getAllPages = () => {
    let allPages = [];
    for (let i = 0; i < listingStats.totalPages; i++) {
      allPages.push(i + 1);
    }
    return allPages;
  }

  const allPages = getAllPages();

  return (
    <div className='pagination'>
      {allPages.map((p) => (
        <button
          key={p}
          onClick={() => updateStateObject(setQuery, 'page', p)}
          className={`button pagination__button ${p === listingStats.currentPage ? 'pagination__button--current' : ''}`}
        >{p}</button>
      ))}
    </div>
  )
}

export default Pagination
