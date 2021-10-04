const removeEmptyParams = (obj) => {
  return Object.entries(obj).reduce(
    (a, [k, v]) =>
      v && v && (v.length > 0 || Number(v)) ? ((a[k] = v), a) : a,
    {}
  );
};

export default removeEmptyParams;