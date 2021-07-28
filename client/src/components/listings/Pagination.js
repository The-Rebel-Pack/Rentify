import React, { useContext } from 'react'
import { QueryContext } from '../../context/QueryContext';
import './style/Pagination.css';

const Pagination = () => {
  const { setQueryPage, currentPage, totalPages } = useContext(QueryContext);

  const getAllPages = () => {
    let arrPages = [];
    for (let i = 0; i < totalPages; i++) {
      arrPages.push(i + 1);
    }
    return arrPages;
  }

  const allPages = getAllPages();

  return (
    <div className='pagination'>
      {allPages.map((p, idx) => (
        <button
          key={idx}
          onClick={() => setQueryPage(p)}
          className={`button pagination__button ${p === currentPage ? 'pagination__button--current' : ''}`}
        >{p}</button>
      ))}
    </div>
  )
}

export default Pagination
