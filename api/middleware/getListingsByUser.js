const fs = require('fs').promises;
const db = require('../config/db');

const getListingsByUser = async (req, res, next) => {
  try {
    let uid;
    if (req.user && req.user.uid) {
      uid = req.user.uid;
    } else {
      uid = req.params.id;
    }
    if (!uid) return res.status(400).end('No user id provided');

    const listingsByUserSQL = await fs.readFile(
      './sql/listings_get_list_user.sql'
    );
    const data = await db.query(listingsByUserSQL.toString(), [uid]);
    req.data = { listings: data.rows };
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = getListingsByUser;
