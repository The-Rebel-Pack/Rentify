const db = require('../knexfile');

(async () => {
  try {
    await db.schema
      .dropTableIfExists('listings')
      .dropTableIfExists('users')
      .dropTableIfExists('categories')
    await db.schema
      .withSchema('public')
      .createTable('users', table => {
        table.increments('id');
        table.string('email')
        table.string('name')
        table.string('first_name')
        table.string('last_name')
      })
      .createTable('categories', table => {
        table.increments('id');
        table.string('category');
      })
      .createTable('listings', table => {
        table.increments('id');
        table.string('title');
        table.string('details');
        table.string('images');
        table
          .integer('category')
          .unsigned()
          .references('categories.id');
        table
          .integer('owner')
          .unsigned()
          .references('users.id');
        console.log('✅ Recreated Rentify tables 🥳')
        process.exit(1)
      })
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
})()
