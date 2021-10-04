const updateQueryParams = (oldParams, property, newValue) => {
  return new URLSearchParams(oldParams).set(property, newValue);
};

export default updateQueryParams;
