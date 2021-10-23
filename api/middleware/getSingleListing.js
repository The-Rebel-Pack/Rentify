const fs = require('fs').promises;
const db = require('../config/db');
const moment = require('moment');

const modifyListingDetails = (result) => {
  return result.map((dbRes) => {
    modRes = dbRes;
    modRes.created_at = moment(modRes.created_at).format(
      'MMMM Do, YYYY [at] HH:mm'
    );
    modRes.updated_at = moment(modRes.updated_at).format(
      'MMMM Do, YYYY [at] HH:mm'
    );
    modRes.last_name = modRes.last_name[0];
    delete modRes.full_name;
    return modRes;
  });
};

const getSingleListing = async (req, res, next) => {
  try {
    const getListingById = await fs.readFile('./sql/listings_get_by_id.sql');
    const result = await db.query(getListingById.toString(), [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).end('Not found');
    }
    req.data = modifyListingDetails([result.rows[0]]);
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = getSingleListing;
