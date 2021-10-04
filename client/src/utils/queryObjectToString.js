import removeEmptyParams from "./removeEmptyParams";

const queryObjectToString = (query) => {
  const strippedQuery = removeEmptyParams(query);
  return new URLSearchParams(strippedQuery).toString();
};

export default queryObjectToString;
