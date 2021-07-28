const createHttpError = (code, message) => {
  const err = new Error(message);
  err.status = code || 500;
  return err;
};

const validateNewUser = (userInput) => {
  console.log(userInput)
  const { name, email, id } = userInput;
  const userDetails = {};
  // first time we guess the first and last name
  const firstName = name.match(/([^\s]*)/);
  const lastNames = name.match(/\s(.*)/);
  userDetails.u_id = id;
  userDetails.full_name = name;
  userDetails.first_name = firstName ? firstName[1] : name;
  userDetails.last_name = lastNames ? lastNames[1] : name;
  userDetails.email = email;
  userDetails.u_details = {};
  return userDetails;
}

const validateUser = (id, userInput) => {
  const { name, first_name, last_name, details } = userInput;
  if (name.trim() === '' || first_name.trim() === '' || last_name.trim() === '') throw createHttpError(400, 'Invalid name');
  const userDetails = {};
  userDetails.u_id = id;
  userDetails.first_name = first_name;
  userDetails.last_name = last_name;
  userDetails.u_details = JSON.stringify(details);
  console.log(userDetails);
  return userDetails;
}

const isValidNumber = (input) => {
  if (isFinite(input)) return true;
  if (input > 0) return true;
  return false;
}

const validateListing = (userInput) => {
  let { category, title, details, price, u_id } = userInput;
  if (!details.images) {
    details = {
      ...details,
      images: []
    }
  };
  category = Number(category);
  price.day = Number(price.day);
  if (title.trim() === '') throw createHttpError(400, 'Invalid title');
  if (!isValidNumber(category)) throw createHttpError(400, 'Invalid category');
  if (!isValidNumber(price.day)) throw createHttpError(400, 'Invalid price per day');
  const listingDetails = {};
  listingDetails.c_id = Number(category);
  listingDetails.title = title;
  listingDetails.details = JSON.stringify(details);
  listingDetails.price = JSON.stringify(price);
  listingDetails.u_id = u_id;
  console.log({ listingDetails });
  return listingDetails;
}

const validateCategoriesStrToArr = (categories) => {
  return categories
    .split(',')
    .map(Number)
    .filter(c => isValidNumber(c));
}

const validateSearchStrToArr = (search) => {
  return search
    .split(' ')
    .filter(s => s.length > 1)
}

module.exports = {
  createHttpError,
  validateUser,
  validateNewUser,
  validateListing,
  validateCategoriesStrToArr,
  validateSearchStrToArr
}