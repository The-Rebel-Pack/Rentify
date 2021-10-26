const fs = require('fs').promises;
const db = require('../config/db');
const { validateUser, validateNewUser } = require('../utils/validation');

const checkIfEmailExists = async (email, next) => {
  try {
    const getUserByEmailSql = await fs.readFile('./sql/users_get_by_email.sql');
    const result = await db.query(getUserByEmailSql.toString(), [email]);
    return result && result.rowCount ? true : false;
  } catch (err) {
    return next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    let userDetails;
    let result;

    if (req.user && req.user.uid) {
      userDetails = validateUser(req.user.uid, req.body);
      const editUserSql = await fs.readFile('./sql/users_edit.sql');
      result = await db.query(editUserSql.toString(), [
        userDetails.full_name,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.u_details,
        userDetails.u_id,
      ]);
    } else {
      const emailExists = await checkIfEmailExists(req.body.email, next);
      if (emailExists) {
        return res.status(200).end('A user with this e-mail already exists');
      }
      userDetails = validateNewUser(req.body);
      const addUserSql = await fs.readFile('./sql/users_add.sql');
      result = await db.query(addUserSql.toString(), [
        userDetails.u_id,
        userDetails.full_name,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.u_details,
      ]);
    }
    return res.status(201).json(result.rows);
  } catch (err) {
    return next(err);
  }
};

module.exports = postUser;
