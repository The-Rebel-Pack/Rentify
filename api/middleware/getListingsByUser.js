const fs = require('fs').promises;
const db = require('../config/db');

const getListingsByUser = async (req, res, next) => {
  try {
    const listingsByUserSQL = await fs.readFile(
      './sql/listings_get_list_user.sql'
    );
    const data = await db.query(listingsByUserSQL.toString(), [req.params.id]);
    req.data = { listings: data.rows };
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = getListingsByUser;
