import React, { useContext, useEffect } from 'react';
import { ListingsContext } from './contexts/ListingsContext';
import { QueryContext } from './contexts/QueryContext';

import Header from "./components/header/Header";
import MainContent from './routers/Router';
import { Footer } from "./components/footer/Footer";
import requestListings from './utils/requestListings';
import requestCategories from './utils/requestCategories';

function App() {
  const { setListings, setListingStats, setCategories } = useContext(ListingsContext);
  const { query } = useContext(QueryContext);

  useEffect(() => {
    const loadListings = async (query) => {
      const data = await requestListings(query);
      setListingStats({
        fullCount: data.full_count,
        totalPages: data.total_pages,
        currentPage: data.current_page
      })
      return setListings(data.listings);
    }

    loadListings(query);

  }, [query, setListingStats, setListings])

  useEffect(() => {
    const loadCategories = async () => {
      const data = await requestCategories();
      return setCategories(data)
    }

    loadCategories();
  }, [setCategories])

  return (
    <main className="app__main">
      <Header />
      <MainContent />
      <Footer />
    </main>
  );
}

export default App;
