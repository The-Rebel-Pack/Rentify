const fs = require('fs').promises;
const db = require('../config/db');

const getAllCategories = async (req, res, next) => {
  const categoriesSQL = await fs.readFile('./sql/categories_get_list.sql');
  const data = await db.query(categoriesSQL.toString());
  req.data = data.rows;
  next();
};

module.exports = getAllCategories;
