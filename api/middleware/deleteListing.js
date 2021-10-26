const fs = require('fs').promises;
const db = require('../config/db');

const deleteListing = async (req, res, next) => {
  try {
    const deleteListingSql = await fs.readFile(
      './sql/listings_delete_by_id.sql'
    );
    const result = await db.query(deleteListingSql.toString(), [req.params.id]);
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteListing;
