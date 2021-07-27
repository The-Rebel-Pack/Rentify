const fs = require('fs').promises;
const db = require('../config/db')
const { validateCategoriesStrToArr, validateSearchStrToArr } = require('./validation');

const dynamicSearchSql = (searchArray, getListingsStr) => {
  const searchSqlParts = searchArray.map((c, i) => `
(title ILIKE '%' || $${i + 2} || '%'
OR details->>'description' ILIKE '%' || $${i + 2} || '%')
`);
  const searchSql = searchSqlParts.join('OR');
  return getListingsStr.replace('WHERE', `WHERE (${searchSql})`)
}

const dynamicCatsSql = (catsArray, getListingsStr, offset) => {
  const catsSqlParts = catsArray.map((c, i) => `
l.c_id = $${i + offset + 2}
`);
  let catsSql = catsSqlParts.join('OR');
  catsSql = offset ? `
AND (${catsSql})` : `(${catsSql})`;
  return getListingsStr.replace('l.c_id = $2', catsSql)
}

const addPagination = async (query, res) => {
  let full_count = null;
  if (res[0] && res[0].full_count) {
    full_count = res[0].full_count
  }
  if (query.page && full_count) {
    const total_pages = Math.ceil(full_count / 6);
    res = res.map(res => {
      res.full_count = Number(full_count);
      res.current_page = Number(query.page);
      res.total_pages = total_pages;
      return res;
    });
  }
  return res;
}

const getListings = async (query) => {
  try {
    const { search, categories } = query;
    const page = query.page ? query.page : 1;
    const catsArray = categories ? validateCategoriesStrToArr(categories) : [];
    const searchArray = search ? validateSearchStrToArr(search) : [];
    const searchTerms = searchArray.length;
    let getListingsStr;
    if (categories || searchTerms) {
      const getListingsSql = await fs.readFile('./sql/listings_get_list_category.sql');
      getListingsStr = getListingsSql.toString();
    }
    if (categories) {
      if (searchTerms) {
        getListingsStr = dynamicSearchSql(searchArray, getListingsStr);
      }
      getListingsStr = dynamicCatsSql(catsArray, getListingsStr, searchTerms)
      console.log(getListingsStr);
      const res = await db.query(getListingsStr, [page, ...searchArray, ...catsArray]);
      console.log(`Got ${res.rowCount} listings from search "${search}" and/or categories "${catsArray}"`);
      return addPagination(query, res.rows);
    }
    if (searchTerms) {
      getListingsStr = getListingsStr.replace('l.c_id = $2', '');
      getListingsStr = dynamicSearchSql(searchArray, getListingsStr);
      // console.log(getListingsStr);
      const res = await db.query(getListingsStr, [page, ...searchArray]);
      console.log(`Got ${res.rowCount} listings from search "${search}"`);
      return addPagination(query, res.rows);
    }
    const getListingsSql = await fs.readFile('./sql/listings_get_list.sql');
    const res = await db.query(getListingsSql.toString(), [page]);
    console.log(`Got ${res.rowCount} listings`);
    return addPagination(query, res.rows);
  } catch (err) {
    console.error(err.message || err);
  }
};

module.exports = {
  getListings
};
