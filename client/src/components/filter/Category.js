import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { QueryContext } from "../../contexts/QueryContext";
// import updateQueryParams from "../../utils/updateQueryParams";
import parameterName from '../../utils/useSearchParams';

const Category = ({ category, id }) => {
  let history = useHistory();
  let location = useLocation();

  const checkIfSelected = (id) => {
    const categorires = new URLSearchParams(location.search).get("categories");
    return categorires ? new RegExp(id).test(categorires) : false;
  };

  // const { query, setQuery } = useContext(QueryContext);
  const [isSelected, setIsSelected] = useState(checkIfSelected(id));

  // useEffect(() => {
  //   let newParams = queryObjectToString(query.categories);
  //   console.log(newParams);
  //   // const strippedQuery = removeEmptyParams(query);
  //   // if (strippedQuery.hasOwnProperty('categories') || strippedQuery.hasOwnProperty('page') || strippedQuery.hasOwnProperty('search')) {
  //   //   newParams = '?' + new URLSearchParams(strippedQuery).toString();
  //   // }
  //   // if (location.search !== newParams) {
  //     // console.log("push to history", history.action)
  //     history.push(newParams);
  //   // }
  // }, [query, history, location]);

  // useEffect(() => {
  //   setIsSelected(query.categories.includes(id));
  // }, [query, id]);

  const updateCategories = (id, prevCategories) => {
    const prevCategoriesArray = prevCategories ? prevCategories.split(',') : [];
    let newCategories = [];
    if (prevCategoriesArray && prevCategoriesArray.length > 0 && prevCategoriesArray.find((cat) => cat === id)) {
      newCategories = prevCategoriesArray.filter((cat) => cat !== id);
    } else {
      newCategories = [...prevCategoriesArray, id];
    }
    return newCategories;
  }

  const toggleCategory = (id) => {
    // parameterName => ({setValue: })
    const oldParams = new URLSearchParams(location.search);
    const newCategories = updateCategories(id, oldParams.get('categories'));
    oldParams.set('categories', newCategories.join(','));
    console.log(oldParams.toString())
    history.push('?'+oldParams.toString());

    // setQuery((prevState) => {
    //   return {
    //     ...prevState,
    //     page: "",
    //     categories: newCategories,
    //   };
    // });
  };

  const classes = `categories__label${
    isSelected ? " categories__label--selected" : ""
  }`;
  return (
    <li className={classes} onClick={() => toggleCategory(id)}>
      {category}
    </li>
  );
};

export default Category;
