const { Pool } = require('pg');
const fs = require('fs');

// const credentials = {
//   "user": process.env.DB_USER,
//   "host": process.env.DB_HOST,
//   "database": process.env.DB_DATABASE,
//   "password": process.env.DB_PASSWORD,
//   "port": process.env.DB_PORT
// }

const credentials = {
  "user": 'docker',
  "host": 'localhost',
  "database": 'docker',
  "password": 'mysecretpassword',
  "port": '5432'
}

const pool = new Pool(credentials);
const setupTables = fs.readFileSync('./sql/setup.sql').toString();

const getAllUsers = (callback) => {
  pool.query('SELECT * FROM users', (err, res) => {
    console.log('Get all users');
    callback(err, res.rows);
  });
};

const getAllListings = (callback) => {
  pool.query('SELECT * FROM listings', (err, res) => {
    console.log(`Got ${res.rowCount} listings`);
    if (res.rowCount > 0) {
      callback(err, res.rows);
    } else {
      callback(err, `Got ${res.rowCount} listings`);
    }
  });
};

const getAllCategories = (callback) => {
  pool.query('SELECT * FROM categories', (err, res) => {
    callback(err, res.rows);
  });
};

const resetDb = () => {
  pool.query(setupTables, (err, res) => {
    if (err) console.error(err.detail || err);
    console.log('Database reset');
  });
}

const getUser = (id, callback) => {
  pool.query(`SELECT * FROM users WHERE Id = ${id}`, (err, res) => {
    callback(err, res.rows);
  });
};

const getListing = (id, callback) => {
  pool.query(`SELECT * FROM listings WHERE Id = ${id}`, (err, res) => {
    callback(err, res.rows);
  });
};

module.exports = {
  getAllUsers,
  getUser,
  getAllListings,
  getAllCategories,
  getListing,
  resetDb,
};
