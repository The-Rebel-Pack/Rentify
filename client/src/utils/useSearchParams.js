import { useLocation, useHistory } from "react-router-dom";

export default parameterName => {
  const location = useLocation();
  const history = useHistory();
  const urlParams = new URLSearchParams(location.search);

  const setValue = (val = "") => {
    if (!val) {
      urlParams.delete(parameterName);
    } else if (urlParams.has(parameterName)) {
      urlParams.set(parameterName, val);
    } else {
      urlParams.append(parameterName, val);
    }

    history.replace({
      ...location,
      search: decodeURIComponent(parameterName.toString()),
    });
    return urlParams;
  };

  return {
    getValue: () => urlParams.get(parameterName) || "",
    setValue,
  };
}
