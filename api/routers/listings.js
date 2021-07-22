const express = require('express');
const router = express.Router();

router.use(express.json());

const {
  getAllListings,
  getAllCategories,
  getListing
} = require('../utils/db');

router.get('/', (req, res) => {
  console.log(req.user);
  getAllListings((err, rows) => {
    res
      .json(rows)
      .status(200)
      .end();
  });
});

router.get('/categories', (req, res) => {
  getAllCategories((err, rows) => {
    res
      .json(rows)
      .status(200)
      .end();
  });
});

router.get('/:id', (req, res) => {
  getListing(req.params.id, (err, row) => {
    if (err) throw err;
    res
      .json(row)
      .status(200)
      .end();
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

// router.post('/', (req, res) => {
//   const { name, description, price, groupId } = req.body;
//   addProduct(name, description, price, groupId, (err, dbRes) => {
//     if (err) throw err;
//     res
//       .json(req.body)
//       .status(201)
//       .end();
//   });
// });

module.exports = router;
