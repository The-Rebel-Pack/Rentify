const express = require('express');
const router = express.Router();

// router.use(express.json());

const { getAllListings, getAllCategories, getListing, addListing, getListingByOwner } = require('../utils/db');
const { validateListing } = require('../utils/validation');

router.get('/', async (req, res) => {
  // console.log(req.user);
  const rows = await getAllListings(req.query);
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

router.get('/users/:id', async (req, res) => {
  const rows = await getListingByOwner(req.params.id);
  if (rows) {
    return res
      .status(200)
      .json(rows)
  }
  return res
    .status(404)
    .end('Not found')
});

router.post('/:id', async (req, res, next) => {
  try {
    const userDetails = validateUser(req.params.id, req.body);
    const rows = await editUser(userDetails);
    res
      .status(201)
      .json(rows)
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  console.log('post:', req.body);
  try {
    const listingDetails = validateListing(req.body);
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
