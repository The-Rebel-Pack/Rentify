const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

router.use(express.json());

const { getAllUsers, getUser, findUserByEmail } = require('../utils/db_read');
const { addUser, editUser } = require('../utils/db_create');
const { validateUser, validateNewUser } = require('../utils/validation');

router.get('/', async (req, res) => {
  const rows = await getAllUsers();
  res
    .status(200)
    .json(rows)
});

router.get('/unique', middleware.decodeToken, async (req, res) => {
  const uid = req.user.uid;
  const rows = await getUser(uid);
  if (rows[0]) {
    return res
      .status(200)
      .json(rows)
  }
  return res
    .status(404)
    .end('Not found')
});

router.post('/unique', middleware.decodeToken, async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const userDetails = validateUser(uid, req.body);
    const rows = await editUser(userDetails);
    res
      .status(201)
      .json(rows)
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const userExists = await findUserByEmail(req.body.email);
    if (userExists) {
      return res
        .status(200)
        .end('User exists')
    }
    const userDetails = validateNewUser(req.body);
    const newRow = await addUser(userDetails);
    return res
      .status(201)
      .json(newRow)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
