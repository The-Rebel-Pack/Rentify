const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const getAllCategories = require('../middleware/getCategories');
const getListings = require('../middleware/getListings');
const getListingsByUser = require('../middleware/getListingsByUser');
const getSingleListing = require('../middleware/getSingleListing');
const addPagination = require('../middleware/addPagination');

const {
  addListing,
  editListing,
  deleteListing,
} = require('../utils/db_create');
const { validateListing } = require('../utils/validation');

router.get('/', getListings, addPagination, (req, res) => {
  return res.status(200).json(req.data);
});

router.get('/categories', getAllCategories, (req, res) => {
  return res.status(200).json(req.data);
});

router.get('/user/:id', getListingsByUser, addPagination, (req, res) => {
  return res.status(200).json(req.data);
});

router.get('/:id', getSingleListing, (req, res) => {
  return res.status(200).json(req.data);
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
