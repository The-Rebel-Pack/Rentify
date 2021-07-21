const validateUser = (userInput) => {
  const { name, email, details } = userInput;
  const userDetails = {};
  // first time we guess the first and last name
  const firstName = name.match(/([^\s]*)/);
  const lastNames = name.match(/\s(.*)/);
  userDetails.name = name;
  userDetails.first_name = firstName ? firstName[1] : name;
  userDetails.last_name = lastNames ? lastNames[1] : name;
  userDetails.email = email;
  userDetails.details = details;
  return userDetails;
}

module.exports = { validateUser }