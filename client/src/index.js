import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ListingsContextProvider from './contexts/ListingsContext';
import QueryContextProvider from './contexts/QueryContext';
import './styles/';

ReactDOM.render(
  <React.StrictMode>
    <QueryContextProvider>
      <ListingsContextProvider>
        <App />
      </ListingsContextProvider>
    </QueryContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
