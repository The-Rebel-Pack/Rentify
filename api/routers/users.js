const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const postUser = require('../middleware/postUser');

router.use(express.json());

const { getAllUsers, getUser, findUserByEmail } = require('../utils/db_read');

router.get('/unique', authorize, async (req, res) => {
  const uid = req.user.uid;
  const rows = await getUser(uid);
  if (rows[0]) {
    return res.status(200).json(rows);
  }
  return res.status(404).end('Not found');
});

router.post('/unique', authorize, postUser, (req, res) => {
  return res.status(201).json(req.data);
});

router.post('/', postUser, (req, res) => {
  return res.status(201).json(req.data);
});

router.get('/', async (req, res) => {
  const rows = await getAllUsers();
  res.status(200).json(rows);
});

module.exports = router;
