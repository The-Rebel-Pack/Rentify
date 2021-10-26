const fs = require('fs').promises;
const db = require('../config/db');

const resetDb = async (next) => {
  try {
    const reset = await fs.readFile('./sql/reset.sql');
    const res = await db.query(reset.toString());
    return 'Database updated';
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  resetDb,
};
