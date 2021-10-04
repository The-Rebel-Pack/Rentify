import React, { useEffect, useState, useContext } from "react";
import useDebounce from "../../utils/useDebounce";
import { FaSearch } from "react-icons/fa";
import "./Search.css";
import { useHistory, useLocation } from "react-router";
import { ListingsContext } from "../../contexts/ListingsContext";

const Search = () => {
  let location = useLocation();
  let history = useHistory();

  const queryParams = useContext(ListingsContext);

  const querySearch = new URLSearchParams(location.search).get("search");
  const [searchInput, setSearchInput] = useState(
    querySearch !== null ? querySearch : ""
  );

  const debouncedSearchTerm = useDebounce(searchInput, 350);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const oldParams = new URLSearchParams(location.search);
    if (debouncedSearchTerm !== oldParams.get("search")) {
      oldParams.set("search", debouncedSearchTerm);
      return history.push("?" + oldParams.toString());
    }
    // oldParams.set("search", debouncedSearchTerm);
    return history.push("?" + oldParams.toString());
  }, [debouncedSearchTerm, history, location.search]);

  return (
    <div className="search">
      <input
        id="search"
        value={searchInput}
        type="text"
        onChange={handleChange}
        autoComplete="off"
        placeholder="Start your search"
        className="search__input"
      />
      <button type="button" className="button button--icon search__button">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
