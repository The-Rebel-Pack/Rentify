const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const getAllCategories = require('../middleware/getCategories');
const getListings = require('../middleware/getListings');
const getListingsByUser = require('../middleware/getListingsByUser');
const getSingleListing = require('../middleware/getSingleListing');
const addPagination = require('../middleware/addPagination');
const postListing = require('../middleware/postListing');

const { deleteListing } = require('../utils/db_create');

router.get('/', getListings, addPagination, (req, res) => {
  return res.status(200).json(req.data);
});

router.get('/categories', getAllCategories, (req, res) => {
  return res.status(200).json(req.data);
});

router.get('/user/:id?', getListingsByUser, addPagination, (req, res) => {
  return res.status(200).json(req.data);
});

router.get('/:id', getSingleListing, (req, res) => {
  return res.status(200).json(req.data);
});

router.post('/:id', authenticate, postListing, (req, res) => {
  return res.status(201).json(req.data);
});

router.post('/', authenticate, postListing, (req, res) => {
  return res.status(201).json(req.data);
});

router.delete('/:id', authenticate, async (req, res) => {
  const rows = await deleteListing(req.params.id);
  if (rows) {
    return res.status(204).end('Deleted successfully');
  }
});

module.exports = router;
