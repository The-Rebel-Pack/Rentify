import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { ListingsContext } from './contexts/ListingsContext';
import { QueryContext } from './contexts/QueryContext';

import Header from "./components/header/Header";
import MainContent from './routers/Router';
import { Footer } from "./components/footer/Footer";
import requestListings from './utils/requestListings';
import queryObjectToString from './utils/queryObjectToString';
import requestCategories from './utils/requestCategories';

function App() {
  const { setListings, setListingStats, setCategories } = useContext(ListingsContext);
  const { query } = useContext(QueryContext);

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const strippedQuery = Object.entries(query).reduce((a, [k, v]) => (v && v.length > 0 ? (a[k] = v, a) : a), {});
    if(strippedQuery.hasOwnProperty('categories') || strippedQuery.hasOwnProperty('page') || strippedQuery.hasOwnProperty('search')) {
      console.log('push this',strippedQuery)
      history.push('?' + new URLSearchParams(strippedQuery).toString());
    }
  }, [query, history]);

  useEffect(() => {
    const loadListings = async (query) => {

      let requestobject;
      if (location.search) {
        requestobject = location.search;
      } else {
        requestobject = queryObjectToString(query);
      }

      const data = await requestListings(requestobject);

      setListingStats({
        fullCount: data.full_count,
        totalPages: data.total_pages,
        currentPage: data.current_page
      });
      return setListings(data.listings);
    };

    loadListings(query);
  }, [query, setListingStats, setListings]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await requestCategories();
      return setCategories(data);
    };

    loadCategories();
  }, [setCategories]);

  return (
    <main className="app__main">
      <Header />
      <MainContent />
      <Footer />
    </main>
  );
}

export default App;
