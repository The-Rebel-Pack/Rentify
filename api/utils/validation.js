const createError = (code, message) => {
  const err = new Error(message);
  err.status = code;
  return err;
};

const validateNewUser = (userInput) => {
  const { name, email } = userInput;
  const userDetails = {};
  // first time we guess the first and last name
  const firstName = name.match(/([^\s]*)/);
  const lastNames = name.match(/\s(.*)/);
  userDetails.name = name;
  userDetails.first_name = firstName ? firstName[1] : name;
  userDetails.last_name = lastNames ? lastNames[1] : name;
  userDetails.email = email;
  userDetails.details = {};
  return userDetails;
}

const validateUser = (id, userInput) => {
  const { name, first_name, last_name, details } = userInput;
  if (name.trim() === '' || first_name.trim() === '' || last_name.trim() === '') throw Error('Invalid name');
  const userDetails = {};
  userDetails.id = Number(id);
  userDetails.name = name;
  userDetails.first_name = first_name;
  userDetails.last_name = last_name;
  userDetails.details = JSON.stringify(details);
  console.log(userDetails);
  return userDetails;
}

const isNumber = (input) => {
  if (isFinite(input)) {
    return true;
  }
  return false;
}

const validateListing = (userInput) => {
  const { name, category, owner, details } = userInput;
  if (name.trim() === '') throw createError(400, 'Invalid name');
  if (!isNumber(category)) throw createError(400, 'Invalid category');
  if (!isNumber(owner)) throw createError(400, 'Invalid user');
  const listingDetails = {};
  listingDetails.name = name;
  listingDetails.category = Number(category);
  listingDetails.details = JSON.stringify(details);
  listingDetails.owner = Number(owner);
  console.log(listingDetails);
  return listingDetails;
}

module.exports = { createError, validateUser, validateNewUser, validateListing }