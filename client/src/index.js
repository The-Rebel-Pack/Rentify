import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css';
import App from './App';
import './config/firebase-config';
import AuthContextProvider from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
