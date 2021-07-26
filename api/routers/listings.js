const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

// router.use(express.json());

const { getAllCategories, getListing, getListingByOwner } = require('../utils/db_read');
const { getListings } = require('../utils/db_read_dynamic');
const { addListing, editListing } = require('../utils/db_create');
const { validateListing } = require('../utils/validation');

router.get('/', async (req, res) => {
  // console.log(req.user);
  const rows = await getListings(req.query);
  if (rows[0]) {
    return res
      .status(200)
      .json(rows)
  }
  return res
    .status(200)
    .end('No listings to show')
});

router.get('/categories', async (req, res) => {
  const rows = await getAllCategories();
  if (rows[0]) {
    return res
      .status(200)
      .json(rows)
  }
  return res
    .status(200)
    .end('No categories to show')
});

router.get('/user', middleware.decodeToken, async (req, res) => {
  const uid = req.user.uid;
  console.log(uid);
  const rows = await getListingByOwner(uid);
  if (rows) {
    return res
      .status(200)
      .json(rows)
  }
  return res
    .status(404)
    .end('Not found')
});

router.get('/:id', async (req, res) => {
  const rows = await getListing(req.params.id);
  if (rows[0]) {
    return res
      .status(200)
      .json(rows)
  }
  return res
    .status(404)
    .end('Not found')
});

router.post('/:id', middleware.decodeToken, async (req, res, next) => {
  const uid = req.user.uid;
  try {
    const listingDetails = validateListing({ ...req.body, u_id: uid });
    listingDetails.l_id = req.params.id;
    const rows = await editListing(listingDetails);
    res
      .status(201)
      .json(rows)
  } catch (err) {
    next(err);
  }
});

router.post('/', middleware.decodeToken, async (req, res, next) => {
  const uid = req.user.uid;
  console.log('incoming post:', req.body);
  try {
    const listingDetails = validateListing({ ...req.body, u_id: uid });
    const rows = await addListing(listingDetails);
    if (rows[0]) {
      return res
        .status(201)
        .json(rows)
    }
    return res
      .status(500)
      .end('Not created')
  } catch (err) {
    next(err);
  }
});

module.exports = router;
