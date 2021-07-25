const fs = require('fs').promises;
const db = require('../config/db')
const { validateCategoriesStrToArr } = require('./validation');

const getAllUsers = async () => {
  try {
    const usersGetList = await fs.readFile('./sql/users_get_list.sql');
    const res = await db.query(usersGetList.toString());
    if (res) console.log(`Got ${res.rowCount} users`);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const getAllListings = async (query) => {
  try {
    if (query) {
      // const page = query.page;
      const search = query.search;
      const categories = query.categories;
      if (search) {
        const getListings = await fs.readFile('./sql/listings_get_list_search.sql');
        const res = await db.query(getListings.toString(), [search]);
        console.log(`Got ${res.rowCount} listings from search "${search}"`);
        return res.rows;
      }
      if (categories) {
        let getListings = await fs.readFile('./sql/listings_get_list_category.sql');
        const catsArray = validateCategoriesStrToArr(categories);
        if (catsArray.length > 1) {
          const catsSqlParts = catsArray.map((c, i) => `category = $${i + 1}`);
          const catsSql = catsSqlParts.join(' OR ');
          getListings = getListings.toString().replace('category = $1', catsSql)
        }
        const res = await db.query(getListings.toString(), catsArray);
        console.log(`Got ${res.rowCount} listings in categories "${catsArray}"`);
        return res.rows;
      }
    }
    const getListings = await fs.readFile('./sql/listings_get_list.sql');
    const res = await db.query(getListings.toString());
    console.log(`Got ${res.rowCount} listings`);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const getAllCategories = async () => {
  try {
    const catsGetList = await fs.readFile('./sql/categories_get_list.sql');
    const res = await db.query(catsGetList.toString());
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const getUser = async (id) => {
  try {
    const getUserById = await fs.readFile('./sql/users_get_by_id.sql');
    const res = await db.query(getUserById.toString(), [id]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const findUserByEmail = async (email) => {
  try {
    const getUserByEmail = await fs.readFile('./sql/users_get_by_email.sql');
    const res = await db.query(getUserByEmail.toString(), [email]);
    if (res) return res.rowCount;
    return 0;
  } catch (err) {
    console.error(err.message || err);
  }
};

const getListing = async (id) => {
  try {
    const getListingById = await fs.readFile('./sql/listings_get_by_id.sql');
    const res = await db.query(getListingById.toString(), [id]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const getListingByOwner = async (id) => {
  try {
    const getListingById = await fs.readFile('./sql/listings_get_list_owner.sql');
    const res = await db.query(getListingById.toString(), [id]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  findUserByEmail,
  getAllListings,
  getAllCategories,
  getListing,
  getListingByOwner,
};
