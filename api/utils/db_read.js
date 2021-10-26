const fs = require('fs').promises;
const db = require('../config/db');

const getAllUsers = async (next) => {
  try {
    const usersGetList = await fs.readFile('./sql/users_get_list.sql');
    const res = await db.query(usersGetList.toString());
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

module.exports = {
  getAllUsers,
  getUser,
};
