const fs = require('fs').promises;
const db = require('../config/db');

const getUsers = async (req, res, next) => {
  try {
    const usersGetListSql = await fs.readFile('./sql/users_get_list.sql');
    const result = await db.query(usersGetListSql.toString());
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getUsers;
