import React, { useContext } from 'react';
import { ListingsContext } from '../../contexts/ListingsContext';
import Category from './Category';
import './Categories.css';

const Categories = () => {

  const { categories } = useContext(ListingsContext);

  return (
    <ul>
      {categories && categories.map((cat) =>
        <Category key={cat.c_id} category={cat.category} id={cat.c_id} />
      )}
    </ul>
  );
};

export default Categories;
