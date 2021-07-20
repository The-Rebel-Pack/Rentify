const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/', async (req, res) => {
  const users = await db.select().from('users')
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await db('users').insert({ name: req.body.name }).returning('*')
  res.json(user)
})

module.exports = router;
