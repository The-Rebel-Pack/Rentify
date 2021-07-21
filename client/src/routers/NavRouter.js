import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from '../components/authentication/NavLogin';
import Register from '../components/authentication/Register';
import Listings from '../components/listings/Listings';

const NavRouter = (props) => {

    return (
        <Router>
            {props.children}
            <Switch>
                <Route exact path="/" >
                    <Listings />
                </Route>
                <Route path="/register" >
                    <Register />
                </Route>
            </Switch>
        </Router>
    )
}

export default NavRouter
