import React, { useState, useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';
import Listings from '../components/listings/Listings';
import { AuthContext } from '../context/AuthContext';

const NavRouter = (props) => {

    const { isAuth, setIsAuth } = useContext(AuthContext);

    const logout = () => {
        setIsAuth({
            ...isAuth,
            user: null,
            token: null,
        })
    }
    const login = () => {
        setIsAuth({
            ...isAuth,
            user: "jane austin",
            token: "7493",
        })
    }

    return (
        <Router>
            {props.children}
            <Switch>
                <Route exact path="/" >
                    <Listings />
                </Route>
                <Route path="/login" >
                    <Login />
                </Route>
                <Route path="/logout" >
                    <Login />
                </Route>
                <Route path="/register" >
                    <Register />
                </Route>
            </Switch>
        </Router>
    )
}

export default NavRouter
