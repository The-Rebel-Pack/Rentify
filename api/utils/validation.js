const createHttpError = (code, message) => {
  const err = new Error(message);
  err.status = code;
  return err;
};

const validateNewUser = (userInput) => {
  const { name, email, id } = userInput;
  const userDetails = {};
  // first time we guess the first and last name
  const firstName = name.match(/([^\s]*)/);
  const lastNames = name.match(/\s(.*)/);
  userDetails.id = id;
  userDetails.name = name;
  userDetails.first_name = firstName ? firstName[1] : name;
  userDetails.last_name = lastNames ? lastNames[1] : name;
  userDetails.email = email;
  userDetails.details = {};
  return userDetails;
}

const validateUser = (id, userInput) => {
  const { name, first_name, last_name, details } = userInput;
  if (name.trim() === '' || first_name.trim() === '' || last_name.trim() === '') throw createHttpError(400, 'Invalid name');
  const userDetails = {};
  userDetails.id = id;
  userDetails.name = name;
  userDetails.first_name = first_name;
  userDetails.last_name = last_name;
  userDetails.details = JSON.stringify(details);
  console.log(userDetails);
  return userDetails;
}

const isValidNumber = (input) => {
  if (isFinite(input)) return true;
  if (input > 0) return true;
  return false;
}

const validateListing = (userInput) => {
  let { category, name, details, price, owner } = userInput;
  category = Number(category);
  price.day = Number(price.day);
  if (name.trim() === '') throw createHttpError(400, 'Invalid name');
  if (!isValidNumber(category)) throw createHttpError(400, 'Invalid category');
  if (!isValidNumber(price.day)) throw createHttpError(400, 'Invalid price per day');
  const listingDetails = {};
  listingDetails.category = Number(category);
  listingDetails.name = name;
  listingDetails.details = JSON.stringify(details);
  listingDetails.price = JSON.stringify(price);
  listingDetails.owner = owner;
  console.log({ listingDetails });
  return listingDetails;
}

const validateCategoriesStrToArr = (categories) => {
  return categories
    .split(',')
    .map(Number)
    .filter(c => isValidNumber(c));
}

module.exports = { createHttpError, validateUser, validateNewUser, validateListing, validateCategoriesStrToArr }