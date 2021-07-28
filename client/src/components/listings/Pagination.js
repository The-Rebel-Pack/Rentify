import React from 'react'
import './style/Pagination.css';

const Pagination = () => {
  return (
    <div className='pagination'>
      <button className='button pagination__button pagination__button--current'>1</button>
      <button className='button pagination__button'>2</button>
    </div>
  )
}

export default Pagination
