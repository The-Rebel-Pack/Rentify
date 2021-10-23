const fs = require('fs').promises;
const db = require('../config/db');

const getListingsByUser = async (req, res, next) => {
  const listingsByUserSQL = await fs.readFile(
    './sql/listings_get_list_user.sql'
  );
  const data = await db.query(listingsByUserSQL.toString(), [req.params.id]);
  req.data = { listings: data.rows };
  next();
};

module.exports = getListingsByUser;
