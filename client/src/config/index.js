const devVariables = {
  apiUrl: process.env.REACT_APP_API_BASE_URL_DEV,
};

const prodVariables = {
  apiUrl: process.env.REACT_APP_API_BASE_URL,
};

export default process.env.NODE_ENV !== 'production'
  ? devVariables
  : prodVariables;
