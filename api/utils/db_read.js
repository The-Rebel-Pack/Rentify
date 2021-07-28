const fs = require('fs').promises;
const db = require('../config/db')
const { addPagination } = require('./addPagination');
const moment = require('moment');

const getAllUsers = async (next) => {
  try {
    const usersGetList = await fs.readFile('./sql/users_get_list.sql');
    const res = await db.query(usersGetList.toString());
    if (res) console.log(`Got ${res.rowCount} users`);
    return res.rows;
  } catch (err) {
    return next(err);
  }
};

const getAllCategories = async (next) => {
  try {
    const catsGetList = await fs.readFile('./sql/categories_get_list.sql');
    const res = await db.query(catsGetList.toString());
    return res.rows;
  } catch (err) {
    return next(err);
  }
};

const getUser = async (id, next) => {
  try {
    const getUserById = await fs.readFile('./sql/users_get_by_id.sql');
    const res = await db.query(getUserById.toString(), [id]);
    return res.rows;
  } catch (err) {
    return next(err);
  }
};

const deleteListing = async (id, next) => {
  try {
    const deleteListingById = await fs.readFile('./sql/listings_delete_by_id.sql');
    const res = await db.query(deleteListingById.toString(), [id]);
    return res.rows;
  } catch (err) {
    return next(err);
  }
};

const findUserByEmail = async (email, next) => {
  try {
    const getUserByEmail = await fs.readFile('./sql/users_get_by_email.sql');
    const res = await db.query(getUserByEmail.toString(), [email]);
    if (res) return res.rowCount;
    return 0;
  } catch (err) {
    return next(err);
  }
};

const filterListingDetails = (res) => {
  return res.map(res => {
    res = res;
    res.created_at = moment(res.created_at).format('MMMM Do, YYYY [at] HH:mm');
    res.updated_at = moment(res.updated_at).format('MMMM Do, YYYY [at] HH:mm');
    res.last_name = res.last_name[0];
    delete res.full_name;
    return res;
  });
}

const getListing = async (id, next) => {
  try {
    const getListingById = await fs.readFile('./sql/listings_get_by_id.sql');
    const res = await db.query(getListingById.toString(), [id]);
    return filterListingDetails(res.rows);
  } catch (err) {
    return next(err);
  }
};

const getListingsByOwner = async (id, next) => {
  try {
    const getListingById = await fs.readFile('./sql/listings_get_list_owner.sql');
    const res = await db.query(getListingById.toString(), [id]);
    return addPagination(res.rows);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  findUserByEmail,
  getAllCategories,
  getListing,
  getListingsByOwner,
  deleteListing
};
