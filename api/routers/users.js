const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const postUser = require('../middleware/postUser');
const getSingleUser = require('../middleware/getSingleUser');
const getUsers = require('../middleware/getUsers');

router.use(express.json());

router.get('/unique', authorize, getSingleUser);

router.post('/unique', authorize, postUser);

router.post('/', postUser);

router.get('/', getUsers);

module.exports = router;
