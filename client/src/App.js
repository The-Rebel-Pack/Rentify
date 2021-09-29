import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import { ListingsContext } from './contexts/ListingsContext';
import { Listings } from './components/listings/Listings';



function App() {
  const { setListings } = useContext(ListingsContext);

  const getListings = async () => {
    const res = await axios.get(`${config.apiUrl}/api/listings`);
    console.log(res.data.listings)
    return setListings(res.data.listings)
  };


useEffect(() => {
  getListings();
}, [])

  return (
    <div className="App">
      <h1>Rentify 2.0</h1>
      <Listings/>
    </div>
  );
}

export default App;
