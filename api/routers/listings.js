const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const {
  getAllCategories,
  getListing,
  getListingsByOwner,
} = require('../utils/db_read');
const { getListings } = require('../utils/db_read_dynamic');
const {
  addListing,
  editListing,
  deleteListing,
} = require('../utils/db_create');
const { validateListing } = require('../utils/validation');

router.get('/', async (req, res, next) => {
  const result = await getListings(req.query);
  return res.status(200).json(result);
});

router.get('/categories', async (req, res, next) => {
  const rows = await getAllCategories(next);
  if (rows[0]) {
    return res.status(200).json(rows || []);
  }
  return res.status(200).end('No categories to show');
});

router.get('/user/:id', async (req, res, next) => {
  const uid = req.params.id;
  const rows = await getListingsByOwner(uid, next);
  if (rows) {
    return res.status(200).json(rows);
  }
  return res.status(404).end('Not found');
});

router.get('/:id', async (req, res, next) => {
  const rows = await getListing(req.params.id, next);
  if (rows[0]) {
    return res.status(200).json(rows);
  }
  return res.status(404).end('Not found');
});

router.use(authenticate);

router.get('/user', async (req, res, next) => {
  if (req.user && req.user.uid) {
    const uid = req.user.uid;
    const result = await getListingsByOwner(uid, next);
    return res.status(200).json(result);
  }
  return res.status(400).end('No user id provided');
});

router.post('/:id', async (req, res, next) => {
  const uid = req.user.uid;
  try {
    const listingDetails = validateListing({ ...req.body, u_id: uid });
    listingDetails.l_id = req.params.id;
    const rows = await editListing(listingDetails);
    res.status(201).json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const uid = req.user.uid;
  try {
    const listingDetails = validateListing({ ...req.body, u_id: uid });
    const rows = await addListing(listingDetails);
    if (rows[0]) {
      return res.status(201).json(rows);
    }
    return res.status(500).end('Not created');
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res) => {
  const rows = await deleteListing(req.params.id);
  if (rows) {
    return res.status(204).end('Deleted successfully');
  }
});

module.exports = router;
