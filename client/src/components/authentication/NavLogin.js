import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";

const Login = () => {
  const { auth, setAuth, setToken } = useContext(AuthContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem('auth', 'true');
        userCred.getIdToken()
          .then((token) => {
            setToken(token);
          });
      };
    });
  }, [setAuth, setToken]);

  const loginWithGoogle = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( async (userCred) => {
        if (userCred) {
          setAuth(true);
          window.localStorage.setItem('auth', 'true');
          await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_BASE_URL}/api/users`,
            data: {
              "id": userCred.user.uid,
              "email": userCred.user.email,
              "name": userCred.user.displayName
            },
          });
        }
      }
      )
      .catch((err) => {
        console.log(err);
      })
  };

  const logout = () => {
    setAuth(false);
    window.localStorage.removeItem('auth');
    firebase.auth().signOut();
  };

  return (
    <div>
      {auth ? (
        <Link to="/" onClick={logout} >
          Logout
        </Link>
      ) : (
        <Link to="/" onClick={loginWithGoogle} >
          Login
        </Link>
      )}
    </div>
  );
}

export default Login;
