const fs = require('fs').promises;
const db = require('../config/db');

const resetSeedDatabase = async (req, res, next) => {
  try {
    const resetSql = await fs.readFile('./sql/reset.sql');
    await db.query(resetSql.toString());
    res.status(201).end('Database reset');
  } catch (err) {
    return next(err);
  }
};

module.exports = resetSeedDatabase;
