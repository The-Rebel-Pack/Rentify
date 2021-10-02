import React, { useContext, useEffect, useState } from 'react';
import { QueryContext } from '../../contexts/QueryContext';

const Category = ({ category, id }) => {

  const { query, setQuery } = useContext(QueryContext);
  const [isSelected, setIsSelected] = useState(query.categories.includes(id));

  useEffect(() => {
    setIsSelected(query.categories.includes(id));
  }, [query, id]);

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
      };
    });
  };

  const classes = `categories__label${isSelected ? ' categories__label--selected' : ''}`;
  return (
    <li className={classes} onClick={() => toggleCategory(id)}>
      {category}
    </li>
  );
};

export default Category;
