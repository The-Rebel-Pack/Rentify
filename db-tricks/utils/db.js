const fs = require('fs').promises;
const db = require('../db')

const createError = (code, message) => {
  const err = new Error(message);
  err.status = code;
  return err;
};

const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', (err, res) => {
    console.log('Get all users');
    callback(err, res.rows);
  });
};

const getAllListings = (callback) => {
  db.query('SELECT * FROM listings', (err, res) => {
    console.log(`Got ${res.rowCount} listings`);
    if (res.rowCount > 0) {
      callback(err, res.rows);
    } else {
      callback(err, `Got ${res.rowCount} listings`);
    }
  });
};

const getAllCategories = (callback) => {
  db.query('SELECT * FROM categories', (err, res) => {
    callback(err, res.rows);
  });
};

const resetDb = async () => {
  const reset = await fs.readFile('./sql/reset.sql');
  db.query(reset.toString(), (err, res) => {
    if (err) return console.error(err.detail || err);
    return console.log('Database reset');
  });
}

const getUser = (id, callback) => {
  db.query(`SELECT * FROM users WHERE Id = ${id}`, (err, res) => {
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

const getListing = (id, callback) => {
  db.query(`SELECT * FROM listings WHERE Id = ${id}`, (err, res) => {
    callback(err, res.rows);
  });
};

module.exports = {
  createError,
  getAllUsers,
  getUser,
  addUser,
  getAllListings,
  getAllCategories,
  getListing,
  resetDb,
};
