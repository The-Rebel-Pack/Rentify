export default queryStringToObject = (qs) => {
  return JSON.parse(
    '{"' + qs.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );
};
