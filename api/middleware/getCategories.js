const fs = require('fs').promises;
const db = require('../config/db');

const getAllCategories = async (req, res, next) => {
  try {
    const categoriesSQL = await fs.readFile('./sql/categories_get_list.sql');
    const data = await db.query(categoriesSQL.toString());
    req.data = data.rows;
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = getAllCategories;
