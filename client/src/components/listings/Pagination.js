import React, { useContext } from 'react'
import './style/Pagination.css';

const Pagination = () => {
  const { setQueryPage, currentPage, totalPages } = useContext(contextValue);

  const getAllPages = () => {
    let allPages = [];
    for (let i = 0; i > totalPages; i++) {
      allPages.append(i + 1);
    }
    return allPages;
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
