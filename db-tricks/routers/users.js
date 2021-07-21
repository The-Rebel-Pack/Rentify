const express = require('express');
const router = express.Router();

router.use(express.json());

const { getAllUsers, getUser, addUser, editUser } = require('../utils/db');
const { validateUser, validateNewUser } = require('../utils/validation');

router.get('/', (req, res) => {
  getAllUsers((err, rows) => {
    res
      .status(200)
      .json(rows)
  });
});

router.get('/:id', (req, res) => {
  getUser(req.params.id, (err, row) => {
    if (err) {
      next(err);
    }
    if (!row[0]) {
      res
        .status(404)
        .end()
    }
    res
      .status(200)
      .json(row)
  });
});

// router.delete('/:id', (req, res) => {
//   deleteProduct(req.params.id, (err) => {
//     if (err) throw err;
//     res
//       .status(204)
//       .end();
//   });
// });

router.post('/:id', (req, res) => {
  const userDetails = validateUser(req.params.id, req.body);
  editUser(userDetails, (err, row) => {
    if (err) {
      throw err;
    }
    res
      .status(201)
      .json(row)
  });
});

router.post('/', (req, res) => {
  const userDetails = validateNewUser(req.body);
  addUser(userDetails, (err, row) => {
    if (err) {
      throw err;
    }
    res
      .status(201)
      .json(row)
  });
});

module.exports = router;
