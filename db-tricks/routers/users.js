const express = require('express');
const router = express.Router();

router.use(express.json());

const { getAllUsers, getUser, addUser } = require('../utils/db');
const { validateUser } = require('../utils/validation');

router.get('/', (req, res) => {
  getAllUsers((err, rows) => {
    res
      .json(rows)
      .status(200)
      .end();
  });
});

router.get('/:id', (req, res) => {
  getUser(req.params.id, (err, row) => {
    if (err) throw err;
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

// router.put('/:id', (req, res) => {
//   updateProduct(req.params.id, req.body, (err, dbRes) => {
//     if (err) throw err;
//     res
//       .json(dbRes)
//       .status(202)
//       .end();
//   });
// });

router.post('/', (req, res) => {
  const userDetails = validateUser(req.body);
  addUser(userDetails, (err, dbRes) => {
    if (err) throw err;
    res
      .status(201)
      .json(dbRes)
  });
});

module.exports = router;
