import React from 'react';
import ReactDOM from 'react-dom';
import './style/';
import App from './App';
import './config/firebase-config';
import AuthContextProvider from './context/AuthContext';
import ListingsContextProvider from './context/ListingsContext';
import QueryContextProvider from './context/QueryContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryContextProvider>
        <ListingsContextProvider>
          <App />
        </ListingsContextProvider>
      </QueryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
