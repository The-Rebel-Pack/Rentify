const queryObjectToString = (query) => {
  const strippedQuery = Object.entries(query).reduce((a, [k, v]) => (v && v.length > 0 ? (a[k] = v, a) : a), {});
  return new URLSearchParams(strippedQuery).toString();
};

export default queryObjectToString;