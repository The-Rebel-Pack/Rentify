const fs = require('fs').promises;
const db = require('../config/db')
const { createError } = require('../utils/validation');

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

const getAllListings = async () => {
  try {
    const listingsGetList = await fs.readFile('./sql/listings_get_list.sql');
    const res = await db.query(listingsGetList.toString());
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

const resetDb = async () => {
  try {
    const reset = await fs.readFile('./sql/reset.sql');
    const res = await db.query(reset.toString());
    return 'Database updated';
  } catch (err) {
    console.error(err.message || err);
  }
}

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

const addUser = async (userDetails) => {
  try {
    const addUser = await fs.readFile('./sql/users_add.sql');
    const res = await db.query(
      addUser.toString(),
      [
        userDetails.name,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.details
      ]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const addListing = async (listingDetails) => {
  try {
    const addListing = await fs.readFile('./sql/listings_add.sql');
    const res = await db.query(
      addListing.toString(),
      [
        listingDetails.name,
        listingDetails.details,
        listingDetails.category,
        listingDetails.owner,
      ]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const editUser = async (userDetails, callback) => {
  try {
    const editUser = await fs.readFile('./sql/users_edit.sql');
    const res = await db.query(
      editUser.toString(),
      [
        userDetails.name,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.details,
        userDetails.id
      ]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const getListing = async (id, callback) => {
  try {
    const getListingById = await fs.readFile('./sql/listings_get_by_id.sql');
    const res = await db.query(getListingById.toString(), [id]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

module.exports = {
  createError,
  getAllUsers,
  getUser,
  addUser,
  findUserByEmail,
  editUser,
  getAllListings,
  getAllCategories,
  getListing,
  addListing,
  resetDb,
};
