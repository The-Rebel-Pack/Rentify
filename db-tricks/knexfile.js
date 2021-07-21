const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'localhost', // needs to be localhost to run scripts, otherwise db is ok
    user: 'docker',
    password: 'mysecretpassword',
    database: 'docker',
  },
})
