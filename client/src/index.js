import React from 'react';
import ReactDOM from 'react-dom';
import './style/';
import App from './App';
import './config/firebase-config';
import AuthContextProvider from './context/AuthContext';
import ListingsContextProvider from './context/ListingsContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ListingsContextProvider>
        <App />
      </ListingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
