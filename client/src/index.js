import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ListingsContextProvider from './contexts/ListingsContext';
import QueryContextProvider from './contexts/QueryContext';
import './styles/';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryContextProvider>
        <ListingsContextProvider>
          <App />
        </ListingsContextProvider>
      </QueryContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
