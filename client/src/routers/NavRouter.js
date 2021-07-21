import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Profile from '../components/profile/Profile';
import Listings from '../components/listings/Listings';

const NavRouter = (props) => {

    return (
        <Router>
            {props.children}
            <Switch>
                <Route exact path="/" >
                    <Listings />
                </Route>
                <Route path="/profile" >
                    <Profile />
                </Route>
            </Switch>
        </Router>
    )
}

export default NavRouter
