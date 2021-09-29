import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ListingsContextProvider from './contexts/ListingsContext';

ReactDOM.render(
  <React.StrictMode>
    <ListingsContextProvider>
      <App />
    </ListingsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
