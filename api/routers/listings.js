const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const getAllCategories = require('../middleware/getCategories');
const getListings = require('../middleware/getListings');
const getListingsByUser = require('../middleware/getListingsByUser');
const getSingleListing = require('../middleware/getSingleListing');
const addPagination = require('../middleware/addPagination');
const postListing = require('../middleware/postListing');
const deleteListing = require('../middleware/deleteListing');

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

router.post('/:id', authorize, postListing, (req, res) => {
  return res.status(201).json(req.data);
});

router.post('/', authorize, postListing, (req, res) => {
  return res.status(201).json(req.data);
});

router.delete('/:id', deleteListing, (req, res) => {
  return res.status(204).end('Deleted successfully');
});

module.exports = router;
