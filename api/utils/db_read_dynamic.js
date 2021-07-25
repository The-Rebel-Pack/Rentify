const fs = require('fs').promises;
const db = require('../config/db')
const { validateCategoriesStrToArr, validateSearchStrToArr } = require('./validation');

const dynamicSearchSql = (searchArray, getListingsStr) => {
  const searchSqlParts = searchArray.map((c, i) => `
(name ILIKE '%' || $${i + 2} || '%'
OR details->>'description' ILIKE '%' || $${i + 2} || '%')
`);
  const searchSql = searchSqlParts.join('OR');
  return getListingsStr.replace('WHERE', `WHERE (${searchSql})`)
}

const dynamicCatsSql = (catsArray, getListingsStr, offset) => {
  const catsSqlParts = catsArray.map((c, i) => `
category = $${i + offset + 2}
`);
  let catsSql = catsSqlParts.join('OR');
  catsSql = offset ? `
AND (${catsSql})` : `(${catsSql})`;
  return getListingsStr.replace('category = $2', catsSql)
}

const getListings = async (query) => {
  try {
    const { search, categories } = query;
    const page = query.page ? query.page : 1;
    const catsArray = categories ? validateCategoriesStrToArr(categories) : [];
    const searchArray = search ? validateSearchStrToArr(search) : [];
    const searchTerms = searchArray.length;
    let getListingsStr;
    if (categories || search) {
      const getListingsSql = await fs.readFile('./sql/listings_get_list_category.sql');
      getListingsStr = getListingsSql.toString();
    }
    if (categories) {
      if (search) {
        getListingsStr = dynamicSearchSql(searchArray, getListingsStr);
      }
      getListingsStr = dynamicCatsSql(catsArray, getListingsStr, searchTerms)
      console.log(getListingsStr);
      const res = await db.query(getListingsStr, [page, ...searchArray, ...catsArray]);
      console.log(`Got ${res.rowCount} listings from search "${search}" and/or categories "${catsArray}"`);
      return res.rows;
    }
    if (search) {
      getListingsStr = getListingsStr.replace('category = $2', '');
      getListingsStr = dynamicSearchSql(searchArray, getListingsStr);
      const res = await db.query(getListingsStr, [page, ...searchArray]);
      console.log(`Got ${res.rowCount} listings from search "${search}"`);
      return res.rows;
    }
    const getListingsSql = await fs.readFile('./sql/listings_get_list.sql');
    const res = await db.query(getListingsSql.toString(), [page]);
    console.log(`Got ${res.rowCount} listings`);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

module.exports = {
  getListings
};
