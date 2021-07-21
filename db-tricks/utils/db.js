const fs = require('fs').promises;
const db = require('../db')

const createError = (code, message) => {
  const err = new Error(message);
  err.status = code;
  return err;
};

const getAllUsers = async (callback) => {
  const usersGetList = await fs.readFile('./sql/users_get_list.sql');
  db.query(usersGetList.toString(), (err, res) => {
    console.log(`Got ${res.rowCount} users`);
    callback(err, res.rows);
  });
};

const getAllListings = async (callback) => {
  const listingsGetList = await fs.readFile('./sql/listings_get_list.sql');
  db.query(listingsGetList.toString(), (err, res) => {
    console.log(`Got ${res.rowCount} listings`);
    if (res.rowCount > 0) {
      callback(err, res.rows);
    } else {
      callback(err, `Got ${res.rowCount} listings`);
    }
  });
};

const getAllCategories = async (callback) => {
  const catsGetList = await fs.readFile('./sql/categories_get_list.sql');
  db.query(catsGetList.toString(), (err, res) => {
    callback(err, res.rows);
  });
};

const resetDb = async (callback) => {
  const reset = await fs.readFile('./sql/reset.sql');
  db.query(reset.toString(), (err, res) => {
    callback(err, 'Database updated')
  });
}

const getUser = async (id, callback) => {
  const getUserById = await fs.readFile('./sql/users_get_by_id.sql');
  db.query(getUserById.toString(), [id], (err, res) => {
    callback(err, res.rows);
  });
};

const addUser = async (userDetails, callback) => {
  const addUser = await fs.readFile('./sql/users_add.sql');
  db.query(
    addUser.toString(),
    [
      userDetails.name,
      userDetails.first_name,
      userDetails.last_name,
      userDetails.email,
      userDetails.details
    ], (err, res) => {
      callback(err, res.rows);
    });
};

const editUser = async (userDetails, callback) => {
  const editUser = await fs.readFile('./sql/users_edit.sql');
  db.query(
    editUser.toString(),
    [
      userDetails.name,
      userDetails.first_name,
      userDetails.last_name,
      userDetails.details,
      userDetails.id
    ], (err, res) => {
      callback(err, res.rows);
    });
};

const getListing = async (id, callback) => {
  const getListingById = await fs.readFile('./sql/listings_get_by_id.sql');
  db.query(getListingById.toString(), [id], (err, res) => {
    callback(err, res.rows);
  });
};

module.exports = {
  createError,
  getAllUsers,
  getUser,
  addUser,
  editUser,
  getAllListings,
  getAllCategories,
  getListing,
  resetDb,
};
