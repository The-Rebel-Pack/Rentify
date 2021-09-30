import React, { useContext, } from 'react';
import { ListingsContext } from '../../contexts/ListingsContext';
// import { QueryContext } from '../../contexts/QueryContext';

const ListingsTitle = () => {
  const { listingStats } = useContext(ListingsContext);
  // const { query } = useContext(QueryContext);

  return (
    <h2 className="section__title">
      {listingStats.fullCount > 0 &&
      <>Listings: {listingStats.fullCount}</>
      }
    </h2>
  )
}

export default ListingsTitle
