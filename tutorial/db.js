const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'db',
    user: 'docker',
    password: 'mysecretpassword',
    database: 'docker',
  },
})
