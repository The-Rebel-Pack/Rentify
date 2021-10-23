const addPagination = async (req, res, next) => {
  let full_count;
  if (req.data.listings.length > 0) {
    full_count = Number(req.data.listings[0].full_count);
    req.data.listings = req.data.listings.map((item) => {
      delete item.u_id;
      delete item.full_count;
      return item;
    });
  } else {
    full_count = 0;
  }
  const current_page = req.query.page ? Number(req.query.page) : 1;
  const total_pages = full_count > 6 ? Math.ceil(full_count / 6) : 1;
  req.data = {
    current_page,
    total_pages,
    full_count,
    listings: req.data.listings,
  };
  next();
};

module.exports = addPagination;
