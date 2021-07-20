const db = require('../db');

console.log(db);

(async () => {
  try {
    await db.schema
      .createTable('users', table => {
        table.increments('id');
        table.string('user_name');
        table.string('name')
        table.string('lastname')
      })
      .createTable('categories', table => {
        table.increments('id');
        table.string('category');
      })
      .createTable('listings', table => {
        table.increments('id');
        table.string('title');
        table.string('description');
        table
          .integer('category')
          .unsigned()
          .references('categories.id');
        table
          .integer('owner')
          .unsigned()
          .references('users.id');
      })
  } catch (e) {
    console.error(e);
  }
})()
