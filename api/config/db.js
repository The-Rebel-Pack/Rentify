const { Pool } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();

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

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
}