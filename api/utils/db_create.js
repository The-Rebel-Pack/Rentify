const fs = require('fs').promises;
const db = require('../config/db');

const resetDb = async (next) => {
  try {
    const reset = await fs.readFile('./sql/reset.sql');
    const res = await db.query(reset.toString());
    return 'Database updated';
  } catch (err) {
    return next(err);
  }
};

const addUser = async (userDetails) => {
  try {
    const addUser = await fs.readFile('./sql/users_add.sql');
    const res = await db.query(addUser.toString(), [
      userDetails.u_id,
      userDetails.full_name,
      userDetails.first_name,
      userDetails.last_name,
      userDetails.email,
      userDetails.u_details,
    ]);
    return res.rows;
  } catch (err) {
    return next(err);
  }
};

const deleteListing = async (id, next) => {
  try {
    const deleteListingById = await fs.readFile(
      './sql/listings_delete_by_id.sql'
    );
    const res = await db.query(deleteListingById.toString(), [id]);
    return res.rows;
  } catch (err) {
    return next(err);
  }
};

const editUser = async (userDetails) => {
  try {
    const editUser = await fs.readFile('./sql/users_edit.sql');
    const res = await db.query(editUser.toString(), [
      userDetails.full_name,
      userDetails.first_name,
      userDetails.last_name,
      userDetails.u_details,
      userDetails.u_id,
    ]);
    return res.rows;
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addUser,
  editUser,
  resetDb,
  deleteListing,
};
