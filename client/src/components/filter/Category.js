import React, { useContext } from 'react'
import { QueryContext } from '../../contexts/QueryContext';
// import { updateStateObject } from '../../utils/updateStateObject';

const Category = ({ category, id, isSelected }) => {
  const { setQuery } = useContext(QueryContext);
  const toggleCategory = (id) => {
    setQuery(prevState => {
      const prevCategories = prevState.categories;
      let newCategories = [];
      if (prevCategories && prevCategories.find((cat) => cat === id)) {
        newCategories = prevCategories.filter((cat) => cat !== id);
      } else {
        newCategories = [...prevCategories, id];
      }
      return {
        ...prevState,
        page: '',
        categories: newCategories
      }
    });
    // updateStateObject(setQuery, 'categories', id);
  }
  const classes = `categories__label${isSelected ? ' categories__label--selected' : ''}`;
  return (
    <li className={classes} onClick={() => toggleCategory(id)}>
      {category}
    </li>
  )
}

export default Category
