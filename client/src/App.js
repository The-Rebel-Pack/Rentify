import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ListingsContext } from "./contexts/ListingsContext";

import Header from "./components/header/Header";
import MainContent from "./routers/Router";
import { Footer } from "./components/footer/Footer";
import requestListings from "./utils/requestListings";
import requestCategories from "./utils/requestCategories";

function App() {
  const { setListings, setListingStats, setCategories } =
    useContext(ListingsContext);
    
  let location = useLocation();

  useEffect(() => {
    const loadListings = async () => {
      const data = await requestListings(location.search);
      setListingStats({
        fullCount: data.full_count,
        totalPages: data.total_pages,
        currentPage: data.current_page,
      });
      return setListings(data.listings);
    };
    loadListings();
  }, [setListingStats, setListings, location]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await requestCategories();
      return setCategories(data);
    };
    loadCategories();
  }, [setCategories]);

    // useEffect(() => {
  //   if (history.action === 'POP') {
  //     return;
  //   }
  //   let newParams = '';
  //   const strippedQuery = removeEmptyParams(query);
  //   if (strippedQuery.hasOwnProperty('categories') || strippedQuery.hasOwnProperty('page') || strippedQuery.hasOwnProperty('search')) {
  //     newParams = '?' + new URLSearchParams(strippedQuery).toString();
  //   }
  //   if (location.search !== newParams) {
  //     // console.log("push to history", history.action)
  //     history.push(newParams);
  //   }
  // }, [query, history, location]);

  return (
    <main className="app__main">
      <Header />
      <MainContent />
      <Footer />
    </main>
  );
}

export default App;
