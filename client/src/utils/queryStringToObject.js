const queryStringToObject = (qs) => {
  return JSON.parse(
    '{"' + qs.replace(/^\?/, '').replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );
};

export default queryStringToObject;
