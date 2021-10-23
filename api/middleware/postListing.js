const { validateListing } = require('../utils/validation');

const postListing = async (req, res, next) => {
  try {
    const listingDetails = validateListing({ ...req.body, u_id: req.user.uid });

    let postListingSql;
    let result;
    if (req.params.id) {
      postListingSql = await fs.readFile('./sql/listings_edit.sql');
      result = await db.query(postListingSql.toString(), [
        listingDetails.c_id,
        listingDetails.title,
        listingDetails.details,
        listingDetails.price,
        listingDetails.u_id,
        req.params.id,
      ]);
    } else {
      postListingSql = await fs.readFile('./sql/listings_add.sql');
      result = await db.query(postListingSql.toString(), [
        listingDetails.c_id,
        listingDetails.title,
        listingDetails.details,
        listingDetails.price,
        listingDetails.u_id,
      ]);
    }
    if (result.rows.length !== 1) {
      return res.status(500).end('Not created');
    }
    req.data = result.rows;
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = postListing;
