import React, { useContext, } from 'react';
import { ListingsContext } from '../../contexts/ListingsContext';
import { QueryContext } from '../../contexts/QueryContext';

const ListingsTitle = () => {
  const { listingStats, categories } = useContext(ListingsContext);
  const { query } = useContext(QueryContext);

  return (
    <h2 className="section__title">
      {!listingStats.fullCount && listingStats.fullCount !== 0 && <>Loading listings...</>}
      {listingStats.fullCount === 0 &&
        <>Found no listing</>
      }
      {listingStats.fullCount === 1 &&
        <>Found  one listing</>
      }
      {listingStats.fullCount > 1 &&
        <>Found {listingStats.fullCount} listings</>
      }
      {query && query.search &&
        <> containing "{query.search}"</>
      }
      {categories.length > 0 && query && query.categories.length > 0 &&
        <> in the categories {query.categories.map((c_id) => {
          const cat = categories.find((cat) => cat.c_id === c_id);
          return cat.category;
        }).join(', ')}</>
      }
    </h2>
  );
};

export default ListingsTitle;
