const fs = require('fs').promises;
const db = require('../config/db');

const getSingleUser = async (req, res, next) => {
  try {
    if (req.user && req.user.uid) {
      const getUserByIdSql = await fs.readFile('./sql/users_get_by_id.sql');
      const result = await db.query(getUserByIdSql.toString(), [req.user.uid]);
      if (result.rows[0]) {
        return res.status(200).json(result.rows);
      }
      return res.status(404).end('Not found');
    }
    return res.status(400).end('No user id');
  } catch (err) {
    next(err);
  }
};

module.exports = getSingleUser;
