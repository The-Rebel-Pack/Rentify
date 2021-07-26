const fs = require('fs').promises;
const db = require('../config/db')
const { createHttpError, isNumber } = require('./validation');

const resetDb = async () => {
  try {
    const reset = await fs.readFile('./sql/reset.sql');
    const res = await db.query(reset.toString());
    return 'Database updated';
  } catch (err) {
    console.error(err.message || err);
  }
}

const addUser = async (userDetails) => {
  try {
    const addUser = await fs.readFile('./sql/users_add.sql');
    const res = await db.query(
      addUser.toString(),
      [
        userDetails.u_id,
        userDetails.full_name,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.u_details
      ]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const addListing = async (listingDetails) => {
  try {
    const addListing = await fs.readFile('./sql/listings_add.sql');
    const res = await db.query(
      addListing.toString(),
      [
        listingDetails.c_id,
        listingDetails.title,
        listingDetails.details,
        listingDetails.price,
        listingDetails.u_id,
      ]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const editListing = async (listingDetails) => {
  try {
    const addListing = await fs.readFile('./sql/listings_edit.sql');
    const res = await db.query(
      addListing.toString(),
      [
        listingDetails.c_id,
        listingDetails.title,
        listingDetails.details,
        listingDetails.price,
        listingDetails.u_id,
        listingDetails.l_id,
      ]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

const editUser = async (userDetails) => {
  try {
    const editUser = await fs.readFile('./sql/users_edit.sql');
    const res = await db.query(
      editUser.toString(),
      [
        userDetails.full_name,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.u_details,
        userDetails.u_id
      ]);
    return res.rows;
  } catch (err) {
    console.error(err.message || err);
  }
};

module.exports = {
  addUser,
  editUser,
  addListing,
  resetDb,
  editListing
};
