const fs = require('fs').promises;
const db = require('../config/db')

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

const filterListingDetails = (res) => {
  return res.map(res => {
    res = res;
    // res.updated_at = new Date(res.updated_at.replace(' ', 'T'));
    console.log(res.updated_at.toString());
    res.last_name = res.last_name[0];
    delete res.full_name;
    return res;
  });
}

const getListing = async (id) => {
  try {
    const getListingById = await fs.readFile('./sql/listings_get_by_id.sql');
    const res = await db.query(getListingById.toString(), [id]);
    return filterListingDetails(res.rows);
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
  getAllCategories,
  getListing,
  getListingByOwner,
};
