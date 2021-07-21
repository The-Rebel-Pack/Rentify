const db = require('../knexfile')

  ; (async () => {
    try {
      await db('users')
        .insert({ name: 'John Doe', email: 'john@doe.com' })
      await db('users')
        .insert({ name: 'Jane Doe', email: 'jane@doe.com' })
      console.log('Added dummy users!')
      process.exit(0)
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  })()
