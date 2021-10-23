const fs = require('fs').promises;
const db = require('../config/db');
const {
  validateCategoriesStrToArr,
  validateSearchStrToArr,
} = require('../utils/validation');

const modifySearchSql = (searchArray, getListingsStr) => {
  const searchSqlParts = searchArray.map(
    (c, i) => `
(title ILIKE '%' || $${i + 2} || '%'
OR details->>'description' ILIKE '%' || $${i + 2} || '%')
`
  );
  const searchSql = searchSqlParts.join('OR');
  return getListingsStr.replace('WHERE', `WHERE (${searchSql})`);
};

const modifyCatsSql = (catsArray, getListingsStr, offset) => {
  const catsSqlParts = catsArray.map(
    (c, i) => `
l.c_id = $${i + offset + 2}
`
  );
  let catsSql = catsSqlParts.join('OR');
  catsSql = offset
    ? `
AND (${catsSql})`
    : `(${catsSql})`;
  return getListingsStr.replace('l.c_id = $2', catsSql);
};

const getListings = async (req, res, next) => {
  try {
    const { search, categories } = req.query;
    const page = req.query.page ? req.query.page : 1;
    const catsArray = categories ? validateCategoriesStrToArr(categories) : [];
    const searchArray = search ? validateSearchStrToArr(search) : [];
    const searchTerms = searchArray.length;
    let getListingsStr;
    if (categories || searchTerms) {
      const getListingsSql = await fs.readFile(
        './sql/listings_get_list_category.sql'
      );
      getListingsStr = getListingsSql.toString();
    }
    if (categories) {
      if (searchTerms) {
        getListingsStr = modifySearchSql(searchArray, getListingsStr);
      }
      getListingsStr = modifyCatsSql(catsArray, getListingsStr, searchTerms);
      const res = await db.query(getListingsStr, [
        page,
        ...searchArray,
        ...catsArray,
      ]);
      req.data = { listings: res.rows };
      return next();
    }
    if (searchTerms) {
      getListingsStr = getListingsStr.replace('l.c_id = $2', '');
      getListingsStr = modifySearchSql(searchArray, getListingsStr);
      const res = await db.query(getListingsStr, [page, ...searchArray]);
      req.data = { listings: res.rows };
      return next();
    }
    const getListingsSql = await fs.readFile('./sql/listings_get_list.sql');
    const res = await db.query(getListingsSql.toString(), [page]);
    req.data = { listings: res.rows };
    return next();
  } catch (err) {
    console.error(err.message || err);
  }
};

module.exports = getListings;
