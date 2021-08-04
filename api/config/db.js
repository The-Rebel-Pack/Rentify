const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();


const databaseConfig = {
  connectionString: process.env.DB_ELEPHANTSQL_URL,
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
  maxUses: 7500
};

const pool = new Pool(databaseConfig);

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
}