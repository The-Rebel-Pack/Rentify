import React, { useContext } from 'react'
import { ListingsContext } from '../../contexts/ListingsContext';
import { QueryContext } from '../../contexts/QueryContext';
import Category from './Category';
import './Categories.css';

const Categories = () => {

  const { categories } = useContext(ListingsContext);
  const { query } = useContext(QueryContext);

  const isSelected = (id) => {
    return query && query.categories && query.categories.includes(id) ? true : false;
  }

  return (
    <ul>
      {categories && categories.map((cat) =>
        <Category key={cat.c_id} category={cat.category} id={cat.c_id} isSelected={isSelected(cat.c_id)} />
      )}
    </ul>
  )
}

export default Categories
